import { Server, Socket } from "socket.io";
import {
  createGame,
  getGame,
  getGames,
  joinGame,
  leaveGame,
} from "./lib/games";

let io;

function broadcastListGamesUpdate() {
  io.emit("list games", getGames());
}

export function listenSocket(server) {
  io = new Server(server, {});
  let lobbyNr = 1;

  io.on("connection", (socket: Socket) => {
    console.log(socket.id + " connected");

    socket.on("disconnect", async () => {
      console.log(socket.id + " disconnected");
      await leaveGame(socket.id);
      broadcastListGamesUpdate();
    });

    socket.on("leave game", async (socketID, lobbyNr) => {
      socket.leave(`lobby${lobbyNr}`);
      await leaveGame(socketID);
      broadcastListGamesUpdate();
    });

    socket.on("list games", () => {
      socket.emit("list games", getGames());
    });

    socket.on("create game", (playerName, socketID) => {
      socket.join(`lobby${lobbyNr}`);
      console.log("Lobby nr " + lobbyNr + " was created");
      createGame(lobbyNr, playerName, socketID);
      socket.emit("pass lobbynr", lobbyNr);
      broadcastListGamesUpdate();
      lobbyNr++;
    });

    socket.on("join game", (lobbyNr, playerName, socketID) => {
      socket.join(`lobby${lobbyNr}`);
      joinGame(lobbyNr, playerName, socketID);
      broadcastListGamesUpdate();
    });

    socket.on("player joined", async (playerName, socketID) => {
      const currentGame = await getGame(socketID);
      io.to(`lobby${currentGame.lobbyNr}`).emit("broadcast join", playerName);
    });
  });
}
