import { Server, Socket } from "socket.io";
import { phase } from "./lib/turnPhases";
import {
  broadcastCurrentDrawPileCardToLobby,
  broadcastDiscardPileToLobby,
  broadcastFirstActivePlayerToLobby,
  broadcastGameStartToLobby,
  broadcastListGamesUpdate,
  broadcastNewDrawPileCardToLobby,
  broadcastPlayerCountToLobby,
  broadcastPlayersToLobby,
  broadcastStatusToActivePlayer,
  broadcastTotalScoresToLobby,
  broadcastTurnPhaseToActivePlayer,
  broadcastTurnStartToActivePlayer,
} from "./lib/broadcasts";
import {
  calculateRoundScore,
  cardReplaceDiscardPileClick,
  cardReplaceDrawPileKeepClick,
  cardRevealClick,
  checkAllPlayersCardsRevealed,
  checkAllPlayersReady,
  checkCardsVerticalRow,
  checkCardsRevealed,
  checkIsLobbyFull,
  createGame,
  dealCardsToPlayers,
  discardCurrentDrawPileCard,
  getGame,
  getGameByLobby,
  getGamesForLobby,
  getPlayer,
  getRoundNr,
  joinGame,
  leaveGame,
  setNextActivePlayer,
} from "./lib/games";
import { status } from "./lib/statusMessages";

export function listenSocket(server): void {
  const io = new Server(server, {});
  let lobbyNr = 1;

  io.on("connection", (socket: Socket) => {
    console.log(socket.id + " connected");

    socket.on("disconnect", async () => {
      console.log(socket.id + " disconnected");
    });

    socket.on("disconnecting", async () => {
      for (let i = 1; i <= 30; i++) {
        if (socket.rooms.has(`lobby${i}`)) {
          const lobbyNr = (await getGame(socket.id)).lobbyNr;
          await leaveGame(socket.id);
          broadcastTotalScoresToLobby(io, lobbyNr);
          broadcastPlayerCountToLobby(io, lobbyNr);
          broadcastPlayersToLobby(io, lobbyNr);
          broadcastListGamesUpdate(io);
          return;
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

    socket.on("get discardpile", (lobbyNr: number) => {
      broadcastDiscardPileToLobby(io, lobbyNr);
    });

    socket.on("get new drawpilecard", async (lobbyNr: number) => {
      broadcastNewDrawPileCardToLobby(io, lobbyNr);
    });

    socket.on("get current drawpilecard", async (lobbyNr: number) => {
      broadcastCurrentDrawPileCardToLobby(io, lobbyNr);
    });

    socket.on("create game", (playerName: string, socketID: string) => {
      socket.join(`lobby${lobbyNr}`);
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
        checkIsLobbyFull(lobbyNr);
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
        await cardRevealClick(socketID, index);
        await calculateRoundScore(socketID, lobbyNr);
        broadcastPlayersToLobby(io, lobbyNr);
      }
    );

    socket.on(
      "check 2 cards revealed",
      async (socketID: string, lobbyNr: number, callback) => {
        const bothCardsRevealed = await checkCardsRevealed(socketID, 2);

        if (bothCardsRevealed) {
          io.to(socketID).emit("display status", status.PRESTARTWAIT);
        }
        if (checkAllPlayersCardsRevealed(lobbyNr, 2)) {
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

    socket.on(
      "DRAWDECISION: click drawpile",
      async (socketID: string, lobbyNr: number) => {
        await broadcastStatusToActivePlayer(
          io,
          socketID,
          lobbyNr,
          status.DRAWPILEDECISION
        );
        await broadcastTurnPhaseToActivePlayer(
          io,
          socketID,
          lobbyNr,
          phase.DRAWPILEDECISION
        );
      }
    );

    socket.on(
      "DISCARDPILE: replace card",
      async (socketID: string, lobbyNr: number, index: number) => {
        await cardReplaceDiscardPileClick(socketID, lobbyNr, index);
        await checkCardsVerticalRow(socketID, lobbyNr);
        await checkCardsRevealed(socketID, 12);
        await calculateRoundScore(socketID, lobbyNr);
        broadcastPlayersToLobby(io, lobbyNr);
        broadcastDiscardPileToLobby(io, lobbyNr);
        await setNextActivePlayer(socketID);
        await broadcastTurnStartToActivePlayer(io, socketID, lobbyNr);
        //edit
      }
    );

    socket.on(
      "DRAWPILEDECISION: click keep",
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
          phase.DRAWPILEKEEP
        );
      }
    );

    socket.on(
      "DRAWPILEDECISION: click discard",
      async (socketID: string, lobbyNr: number) => {
        await broadcastStatusToActivePlayer(
          io,
          socketID,
          lobbyNr,
          status.DRAWPILEDISCARD
        );
        await broadcastTurnPhaseToActivePlayer(
          io,
          socketID,
          lobbyNr,
          phase.DRAWPILEDISCARD
        );
        discardCurrentDrawPileCard(lobbyNr);
        broadcastDiscardPileToLobby(io, lobbyNr);
        broadcastCurrentDrawPileCardToLobby(io, lobbyNr);
      }
    );

    socket.on(
      "DRAWPILE: invalid reveal card",
      async (socketID: string, lobbyNr: number) => {
        await broadcastStatusToActivePlayer(
          io,
          socketID,
          lobbyNr,
          status.DRAWPILEDISCARDINVALID
        );
      }
    );

    socket.on(
      "DRAWPILE: replace card",
      async (socketID: string, lobbyNr: number, index: number) => {
        await cardReplaceDrawPileKeepClick(socketID, lobbyNr, index);
        await checkCardsVerticalRow(socketID, lobbyNr);
        await checkCardsRevealed(socketID, 12);
        await calculateRoundScore(socketID, lobbyNr);
        broadcastCurrentDrawPileCardToLobby(io, lobbyNr);
        broadcastPlayersToLobby(io, lobbyNr);
        broadcastDiscardPileToLobby(io, lobbyNr);
        await setNextActivePlayer(socketID);
        await broadcastTurnStartToActivePlayer(io, socketID, lobbyNr);
        //edit
      }
    );

    socket.on(
      "DRAWPILE: reveal card",
      async (socketID: string, lobbyNr: number, index: number) => {
        await cardRevealClick(socketID, index);
        await checkCardsVerticalRow(socketID, lobbyNr);
        await checkCardsRevealed(socketID, 12);
        await calculateRoundScore(socketID, lobbyNr);
        broadcastPlayersToLobby(io, lobbyNr);
        await setNextActivePlayer(socketID);
        await broadcastTurnStartToActivePlayer(io, socketID, lobbyNr);
        //edit
      }
    );
  });
}
