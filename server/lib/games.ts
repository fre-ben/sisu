import { generateCards } from "./cards";
import type {
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
    drawPileCards: generateCards(),
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
  const discardPile = getGameByLobby(lobbyNr).discardPileCards;
  return discardPile[discardPile.length - 1];
}

// export function getNumberOfGames(): number {
//   return games[[0].length];
// }

export function getRandomCard(lobbyNr: number): Card {
  const drawPile = getGameByLobby(lobbyNr).drawPileCards;
  const randomIndex = Math.floor(Math.random() * (drawPile.length + 1));
  const randomCard = drawPile[randomIndex];
  drawPile.splice(randomIndex, 1);
  if (randomCard === null) {
    getRandomCard(lobbyNr);
  } else {
    return randomCard;
  }
}

export function dealCardsToPlayers(amount: number, lobbyNr: number): void {
  const playerCount = games[lobbyNr].playerCount;

  for (let i = 0; i < playerCount; i++) {
    const player = games[lobbyNr].players[i];
    for (let j = 1; j <= amount; j++) {
      const randomCard = getRandomCard(lobbyNr);
      player.cards.push(randomCard);
    }
  }
  console.log(JSON.stringify(games[lobbyNr], null, 4));
  console.log("drawpile length is", games[lobbyNr].drawPileCards.length);
}

export async function cardGridClick(
  socketID: string,
  index: number
): Promise<void> {
  (await getPlayer(socketID)).cards[index].hidden = false;
}

export async function calculateRoundScore(socketID: string, lobbyNr: number) {
  const player = await getPlayer(socketID);
  const roundNr = games[lobbyNr].roundNr;
  let roundScore = null;

  player.cards.forEach((card) => {
    if (card.hidden === false) {
      roundScore = roundScore + card.value;
    }
  });

  player.roundScore[roundNr - 1] = roundScore;
}

export async function checkTwoCardsRevealed(
  socketID: string
): Promise<boolean> {
  const player = await getPlayer(socketID);
  const revealedCards = player.cards.filter((card) => card.hidden === false);

  console.log(revealedCards);
  if (revealedCards.length === 2) {
    return true;
  } else {
    return false;
  }
}

export function checkAllPlayers2CardsRevealed(lobbyNr: number): boolean {
  const currentGame = getGameByLobby(lobbyNr);
  return currentGame.players.every((player) => {
    const revealedCards = player.cards.filter((card) => card.hidden === false);
    if (revealedCards.length === 2) {
      return true;
    }
  });
}
