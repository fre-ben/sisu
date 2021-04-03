import { Server, Socket } from "socket.io";
import {
  checkAllPlayersReady,
  createGame,
  getDiscardPile,
  getGame,
  getGameByLobby,
  getGamesForLobby,
  getPlayer,
  getPlayerCount,
  getPlayersInLobby,
  getRoundNr,
  getTotalScores,
  joinGame,
  leaveGame,
} from "./lib/games";

let io;

function broadcastListGamesUpdate(): void {
  io.emit("display list of games", getGamesForLobby());
}

function broadcastPlayerCountToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit(
    "display current playercount",
    getPlayerCount(lobbyNr)
  );
}

function broadcastTotalScoresToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit("display scores", getTotalScores(lobbyNr));
}

function broadcastPlayersToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit("display players", getPlayersInLobby(lobbyNr));
}

function broadcastGameStartToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit("all players ready", getGameByLobby(lobbyNr));
}

function broadcastDiscardPileToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit("display discardpile", getDiscardPile(lobbyNr));
}

export function listenSocket(server): void {
  io = new Server(server, {});
  let lobbyNr = 1;

  io.on("connection", (socket: Socket) => {
    console.log(socket.id + " connected");

    socket.on("disconnect", async () => {
      console.log(socket.id + " disconnected");
    });

    socket.on("disconnecting", async () => {
      console.log(socket.id, " disconnecting");
      for (let i = 1; i <= 20; i++) {
        if (socket.rooms.has(`lobby${i}`)) {
          console.log(i, true);
          const lobbyNr = (await getGame(socket.id)).lobbyNr;
          await leaveGame(socket.id);
          broadcastTotalScoresToLobby(io, lobbyNr);
          broadcastPlayerCountToLobby(io, lobbyNr);
          broadcastPlayersToLobby(io, lobbyNr);
          broadcastListGamesUpdate();
          return;
        } else {
          console.log(i, false);
        }
      }
    });

    socket.on("leave game", async (socketID: string, lobbyNr: number) => {
      socket.leave(`lobby${lobbyNr}`);
      await leaveGame(socketID);
      broadcastListGamesUpdate();
      broadcastTotalScoresToLobby(io, lobbyNr);
      broadcastPlayerCountToLobby(io, lobbyNr);
      broadcastPlayersToLobby(io, lobbyNr);
    });

    socket.on("get list of games", () => {
      socket.emit("display list of games", getGamesForLobby());
    });

    socket.on("get scores to display", (lobbyNr: number) => {
      broadcastTotalScoresToLobby(io, lobbyNr);
    });

    socket.on("get rounds to display", (lobbyNr: number) => {
      socket.emit("display rounds", getRoundNr(lobbyNr));
    });

    socket.on("get playercount", (lobbyNr: number) => {
      broadcastPlayerCountToLobby(io, lobbyNr);
    });

    socket.on("get players", (lobbyNr: number) => {
      broadcastPlayersToLobby(io, lobbyNr);
    });

    socket.on("get discardpile", (lobbyNr) => {
      broadcastDiscardPileToLobby(io, lobbyNr);
    });

    socket.on("create game", (playerName: string, socketID: string) => {
      socket.join(`lobby${lobbyNr}`);
      console.log("Lobby nr " + lobbyNr + " was created");
      createGame(lobbyNr, playerName, socketID);
      socket.emit("pass lobbynr", lobbyNr);
      broadcastPlayerCountToLobby(io, lobbyNr);
      broadcastTotalScoresToLobby(io, lobbyNr);
      broadcastPlayersToLobby(io, lobbyNr);
      broadcastListGamesUpdate();
      lobbyNr++;
    });

    socket.on(
      "join game",
      (lobbyNr: number, playerName: string, socketID: string) => {
        socket.join(`lobby${lobbyNr}`);
        joinGame(lobbyNr, playerName, socketID);
        broadcastPlayerCountToLobby(io, lobbyNr);
        broadcastTotalScoresToLobby(io, lobbyNr);
        broadcastPlayersToLobby(io, lobbyNr);
        broadcastListGamesUpdate();
      }
    );

    socket.on("player is ready", async (socketID, lobbyNr) => {
      const player = await getPlayer(socketID);
      player.isReady = true;
      broadcastPlayersToLobby(io, lobbyNr);
    });

    socket.on("check all players ready", (lobbyNr) => {
      if (checkAllPlayersReady(lobbyNr)) {
        getGameByLobby(lobbyNr).hasStarted = true;
        broadcastGameStartToLobby(io, lobbyNr);
        broadcastListGamesUpdate();
      } else {
        return;
      }
    });
  });
}
