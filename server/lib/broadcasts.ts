import {
  getActivePlayer,
  getCurrentDrawPileCard,
  getDiscardPile,
  getFirstActivePlayer,
  getGameByLobby,
  getGamesForLobby,
  getNewDrawPileCard,
  getPlayerCount,
  getPlayersInLobby,
  getRoundNr,
  getTotalScores,
} from "./games";
import { status } from "./statusMessages";
import { phase } from "./turnPhases";

export function broadcastListGamesUpdate(io): void {
  io.emit("display list of games", getGamesForLobby());
}

export function broadcastPlayerCountToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit(
    "display current playercount",
    getPlayerCount(lobbyNr)
  );
}

export function broadcastTotalScoresToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit("display scores", getTotalScores(lobbyNr));
}

export function broadcastPlayersToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit("display players", getPlayersInLobby(lobbyNr));
}

export function broadcastGameStartToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit("all players ready", getGameByLobby(lobbyNr));
}

export function broadcastDiscardPileToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit("display discardpile", getDiscardPile(lobbyNr));
}

export function broadcastRoundNrToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit("display rounds", getRoundNr(lobbyNr));
}

export function broadcastNewDrawPileCardToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit(
    "display new drawpilecard",
    getNewDrawPileCard(lobbyNr)
  );
}

export function broadcastCurrentDrawPileCardToLobby(io, lobbyNr: number): void {
  io.to(`lobby${lobbyNr}`).emit(
    "display current drawpilecard",
    getCurrentDrawPileCard(lobbyNr)
  );
}

export async function broadcastFirstActivePlayerToLobby(
  io,
  lobbyNr: number,
  socketID: string
): Promise<void> {
  io.to(`lobby${lobbyNr}`).emit(
    "set first active player",
    await getFirstActivePlayer(lobbyNr, socketID)
  );
}

export async function broadcastStatusToActivePlayer(
  io,
  socketID: string,
  lobbyNr: number,
  activePlayerStatus: string
) {
  const activePlayer = await getActivePlayer(socketID);
  io.to(`lobby${lobbyNr}`).emit(
    "display status",
    status.WAITTURN(activePlayer.name)
  );
  io.to(activePlayer.socketID).emit("display status", activePlayerStatus);
}

export async function broadcastTurnPhaseToActivePlayer(
  io,
  socketID: string,
  lobbyNr: number,
  activePlayerTurnPhase: string
) {
  const activePlayer = await getActivePlayer(socketID);
  io.to(`lobby${lobbyNr}`).emit("set turn phase", phase.WAITTURN);
  io.to(activePlayer.socketID).emit("set turn phase", activePlayerTurnPhase);
}

export async function broadcastTurnStartToActivePlayer(
  io,
  socketID: string,
  lobbyNr: number
) {
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
