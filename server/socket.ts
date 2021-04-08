import { Server, Socket } from "socket.io";
import { phase } from "../lib/turnPhases";
import {
  broadcastDiscardPileToLobby,
  broadcastFirstActivePlayerToLobby,
  broadcastGameStartToLobby,
  broadcastListGamesUpdate,
  broadcastPlayerCountToLobby,
  broadcastPlayersToLobby,
  broadcastStatusToActivePlayer,
  broadcastTotalScoresToLobby,
  broadcastTurnPhaseToActivePlayer,
} from "./lib/broadcasts";
import {
  calculateRoundScore,
  cardGridClick,
  checkAllPlayers2CardsRevealed,
  checkAllPlayersReady,
  checkTwoCardsRevealed,
  createGame,
  dealCardsToPlayers,
  getGame,
  getGameByLobby,
  getGamesForLobby,
  getPlayer,
  getRoundNr,
  joinGame,
  leaveGame,
} from "./lib/games";
import { status } from "./lib/statusMessages";

let io;

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
          broadcastListGamesUpdate(io);
          return;
        } else {
          console.log(i, false);
        }
      }
    });

    socket.on("leave game", async (socketID: string, lobbyNr: number) => {
      socket.leave(`lobby${lobbyNr}`);
      await leaveGame(socketID);
      broadcastListGamesUpdate(io);
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
      io.to(`lobby${lobbyNr}`).emit("display rounds", getRoundNr(lobbyNr));
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
      broadcastListGamesUpdate(io);
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
        broadcastListGamesUpdate(io);
      }
    );

    socket.on("player is ready", async (socketID, lobbyNr) => {
      const player = await getPlayer(socketID);
      player.isReady = true;
      broadcastPlayersToLobby(io, lobbyNr);
    });

    socket.on("check all players ready", (lobbyNr: number) => {
      if (checkAllPlayersReady(lobbyNr)) {
        getGameByLobby(lobbyNr).hasStarted = true;
        broadcastGameStartToLobby(io, lobbyNr);
        dealCardsToPlayers(12, lobbyNr);
        broadcastPlayersToLobby(io, lobbyNr);
        broadcastDiscardPileToLobby(io, lobbyNr);
        broadcastListGamesUpdate(io);
        io.to(`lobby${lobbyNr}`).emit("display status", status.PRESTART);
      } else {
        return;
      }
    });

    socket.on(
      "cardgrid click",
      async (socketID: string, lobbyNr: number, index: number) => {
        await cardGridClick(socketID, index);
        await calculateRoundScore(socketID, lobbyNr);
        broadcastPlayersToLobby(io, lobbyNr);
      }
    );

    socket.on(
      "check 2 cards revealed",
      async (socketID: string, lobbyNr: number, callback) => {
        const bothCardsRevealed = await checkTwoCardsRevealed(socketID);

        if (bothCardsRevealed) {
          io.to(socketID).emit("display status", status.PRESTARTWAIT);
        }
        if (checkAllPlayers2CardsRevealed(lobbyNr)) {
          await broadcastFirstActivePlayerToLobby(io, lobbyNr, socketID);
          await broadcastStatusToActivePlayer(
            io,
            socketID,
            lobbyNr,
            status.DRAWDECISION
          );
          await broadcastTurnPhaseToActivePlayer(
            io,
            socketID,
            lobbyNr,
            phase.DRAWDECISION
          );
        }
        callback(bothCardsRevealed);
      }
    );

    socket.on(
      "DRAWDECISION: click discardpile",
      async (socketID: string, lobbyNr: number) => {
        await broadcastStatusToActivePlayer(
          io,
          socketID,
          lobbyNr,
          status.DRAWDISCARDPILEKEEP
        );
        await broadcastTurnPhaseToActivePlayer(
          io,
          socketID,
          lobbyNr,
          phase.DISCARDPILEDECISION
        );
      }
    );
  });
}
