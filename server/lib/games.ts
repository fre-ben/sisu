import { generateCards } from "./cards";
import {
  Game,
  GamesType,
  GameForLobby,
  Player,
  PlayerScoreList,
  PlayerForCardGrid,
  Card,
} from "./gameTypes";

const games: GamesType = {};

export function createGame(
  lobbyNr: number,
  playerName: string,
  socketID: string
): void {
  console.log("Game created on server side");
  games[lobbyNr] = {
    lobbyNr,
    roundNr: 1,
    playerCount: 1,
    lobbyIsFull: false,
    hasStarted: false,
    nextPlayer: "",
    players: [
      {
        name: playerName,
        socketID: socketID,
        isReady: false,
        cards: [],
        totalScore: 0,
        roundScore: [],
      },
    ],
    //commented out for easier reading of server log
    // drawPileCards: generateCards(),
    drawPileCards: [],
    discardPileCards: [],
  };
  //commented out for now
  // console.log(JSON.stringify(games, null, 4));
}

function checkIsLobbyFull(lobbyNr: number): boolean {
  if (games[lobbyNr].playerCount >= 8) {
    games[lobbyNr].lobbyIsFull = true;
    return true;
  }
}

export function joinGame(
  lobbyNr: number,
  playerName: string,
  socketID: string
): void {
  if (checkIsLobbyFull(lobbyNr)) {
    console.log("Lobby is full");
    return;
  }
  console.log(playerName + ":" + socketID + " joined " + lobbyNr);
  const playersInGame = games[lobbyNr].players;
  playersInGame.push({
    name: playerName,
    socketID: socketID,
    isReady: false,
    cards: [],
    totalScore: 0,
    roundScore: [],
  });
  games[lobbyNr].playerCount++;

  console.log(JSON.stringify(games, null, 4));
}

export async function leaveGame(socketID: string): Promise<void> {
  const currentGame = await getGame(socketID);
  if (!currentGame) {
    console.log("No game found");
    return;
  }

  const currentGamePlayers = currentGame.players.map(
    (player) => player.socketID
  );
  const indexOfTargetPlayer = currentGamePlayers.indexOf(socketID);

  if (indexOfTargetPlayer > -1) {
    currentGame.players.splice(indexOfTargetPlayer, 1);
    currentGame.playerCount--;
    console.log(JSON.stringify(games, null, 4));
  } else {
    console.log("Player not found!");
  }
}

export function getGamesForLobby(): GameForLobby[] {
  return Object.values(games).map((game) => {
    return {
      lobbyNr: game.lobbyNr,
      playerCount: game.playerCount,
      lobbyIsFull: game.lobbyIsFull,
      hasStarted: game.hasStarted,
    };
  });
}

export async function getGame(socketID: string): Promise<Game> {
  return Object.values(games).find((game) =>
    game.players.find((id) => id.socketID === socketID)
  );
}

export async function getPlayer(socketID: string): Promise<Player> {
  const currentGame = await getGame(socketID);
  const player = currentGame.players.find((id) => id.socketID === socketID);

  return player;
}

export function getTotalScores(lobbyNr: number): PlayerScoreList[] {
  return games[lobbyNr].players.map((player) => {
    return { name: player.name, totalScore: player.totalScore };
  });
}

export function getRoundNr(lobbyNr: number): number {
  return games[lobbyNr].roundNr;
}

export function getPlayerCount(lobbyNr: number): number {
  return games[lobbyNr].playerCount;
}

export function getPlayersInLobby(lobbyNr: number): PlayerForCardGrid[] {
  return games[lobbyNr].players.map((player) => {
    return {
      name: player.name,
      cards: player.cards,
      roundScore: player.roundScore,
      socketID: player.socketID,
      isReady: player.isReady,
    };
  });
}

export function checkAllPlayersReady(lobbyNr: number): boolean {
  const players = games[lobbyNr].players;
  return players.every((player) => player.isReady);
}

export function getGameByLobby(lobbyNr: number): Game {
  return games[lobbyNr];
}

export function getDiscardPile(lobbyNr: number): Card {
  const discardpile = getGameByLobby(lobbyNr).discardPileCards;
  return discardpile[discardpile.length - 1];
}
