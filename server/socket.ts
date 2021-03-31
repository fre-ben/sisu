import { Server, Socket } from "socket.io";
import {
  createGame,
  getGame,
  getGamesForLobby,
  getPlayerCount,
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

export function listenSocket(server): void {
  io = new Server(server, {});
  let lobbyNr = 1;

  io.on("connection", (socket: Socket) => {
    console.log(socket.id + " connected");

    socket.on("disconnect", async () => {
      console.log(socket.id + " disconnected");
      await leaveGame(socket.id);
      try {
        //Hier liegt evtl. das Problem - ich muss die lobbyNr irgendwo anders herbekommen
        const lobbyNr = (await getGame(socket.id)).lobbyNr;
        broadcastTotalScoresToLobby(io, lobbyNr);
        broadcastPlayerCountToLobby(io, lobbyNr);
        broadcastListGamesUpdate();
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("leave game", async (socketID: string, lobbyNr: number) => {
      socket.leave(`lobby${lobbyNr}`);
      await leaveGame(socketID);
      broadcastListGamesUpdate();
      broadcastTotalScoresToLobby(io, lobbyNr);
      broadcastPlayerCountToLobby(io, lobbyNr);
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

    socket.on("create game", (playerName: string, socketID: string) => {
      socket.join(`lobby${lobbyNr}`);
      console.log("Lobby nr " + lobbyNr + " was created");
      createGame(lobbyNr, playerName, socketID);
      socket.emit("pass lobbynr", lobbyNr);
      broadcastPlayerCountToLobby(io, lobbyNr);
      broadcastTotalScoresToLobby(io, lobbyNr);
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
        broadcastListGamesUpdate();
      }
    );

    socket.on("player joined", async (playerName: string, socketID: string) => {
      const currentGame = await getGame(socketID);
      io.to(`lobby${currentGame.lobbyNr}`).emit("broadcast join", playerName);
    });
  });
}
