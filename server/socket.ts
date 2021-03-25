import { Server, Socket } from "socket.io";
import { createGame, getGames } from "./lib/games";

let io;

function broadcastListGamesUpdate() {
  io.emit("list games", getGames());
}

export function listenSocket(server) {
  io = new Server(server, {});
  let lobbyNr = 1;

  io.on("connection", (socket: Socket) => {
    console.log(socket.id + " connected");

    socket.on("disconnect", () => {
      console.log(socket.id + " disconnected");
    });

    socket.on("list games", () => {
      socket.emit("list games", getGames());
    });

    socket.emit("");

    // Hier müsste userName noch ankommen und in createGame() übergeben werden
    socket.on("create game", () => {
      //Testdata
      const userName = "Test";
      const socketID = "socketTestID";

      socket.join(`lobby${lobbyNr}`);
      console.log("Lobby nr " + lobbyNr + " was created");
      createGame(lobbyNr, userName, socketID);
      socket.emit("pass lobbynr", lobbyNr);
      broadcastListGamesUpdate();
      lobbyNr++;
    });
  });
}
