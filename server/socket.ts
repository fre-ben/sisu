import { Server, Socket } from "socket.io";
import {
  createGame,
  getGame,
  getGames,
  getPlayerCount,
  getRoundNr,
  getTotalScores,
  joinGame,
  leaveGame,
} from "./lib/games";

let io;

function broadcastListGamesUpdate() {
  io.emit("display list of games", getGames());
}

function broadcastPlayerCountToLobby(io, lobbyNr) {
  io.to(`lobby${lobbyNr}`).emit(
    "display current playercount",
    getPlayerCount(lobbyNr)
  );
}

function broadcastTotalScoresToLobby(io, lobbyNr) {
  io.to(`lobby${lobbyNr}`).emit("display scores", getTotalScores(lobbyNr));
}

export function listenSocket(server) {
  io = new Server(server, {});
  let lobbyNr = 1;

  io.on("connection", (socket: Socket) => {
    console.log(socket.id + " connected");

    socket.on("disconnect", async () => {
      console.log(socket.id + " disconnected");
      try {
        await leaveGame(socket.id);
        const lobbyNr = await getGame(socket.id);
        broadcastTotalScoresToLobby(io, lobbyNr);
        broadcastPlayerCountToLobby(io, lobbyNr);
        broadcastListGamesUpdate();
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("leave game", async (socketID, lobbyNr) => {
      socket.leave(`lobby${lobbyNr}`);
      await leaveGame(socketID);
      broadcastListGamesUpdate();
      broadcastTotalScoresToLobby(io, lobbyNr);
      broadcastPlayerCountToLobby(io, lobbyNr);
    });

    socket.on("get list of games", () => {
      socket.emit("display list of games", getGames());
    });

    socket.on("get scores to display", (lobbyNr) => {
      broadcastTotalScoresToLobby(io, lobbyNr);
    });

    socket.on("get rounds to display", (lobbyNr) => {
      socket.emit("display rounds", getRoundNr(lobbyNr));
    });

    socket.on("get playercount", (lobbyNr) => {
      broadcastPlayerCountToLobby(io, lobbyNr);
    });

    socket.on("create game", (playerName, socketID) => {
      socket.join(`lobby${lobbyNr}`);
      console.log("Lobby nr " + lobbyNr + " was created");
      createGame(lobbyNr, playerName, socketID);
      socket.emit("pass lobbynr", lobbyNr);
      broadcastPlayerCountToLobby(io, lobbyNr);
      broadcastTotalScoresToLobby(io, lobbyNr);
      broadcastListGamesUpdate();
      lobbyNr++;
    });

    socket.on("join game", (lobbyNr, playerName, socketID) => {
      socket.join(`lobby${lobbyNr}`);
      joinGame(lobbyNr, playerName, socketID);
      broadcastPlayerCountToLobby(io, lobbyNr);
      broadcastTotalScoresToLobby(io, lobbyNr);
      broadcastListGamesUpdate();
    });

    socket.on("player joined", async (playerName, socketID) => {
      const currentGame = await getGame(socketID);
      io.to(`lobby${currentGame.lobbyNr}`).emit("broadcast join", playerName);
    });
  });
}
