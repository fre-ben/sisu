import { generateCards } from "./cards";
import type {
  Game,
  GamesType,
  GameForLobby,
  Player,
  PlayerScoreList,
  PlayerForCardGrid,
  Card,
  ActivePlayer,
} from "./gameTypes";

const games: GamesType = {};

export function createGame(
  lobbyNr: number,
  playerName: string,
  socketID: string
): void {
  games[lobbyNr] = {
    lobbyNr,
    roundNr: 1,
    playerCount: 1,
    lobbyIsFull: false,
    hasStarted: false,
    activePlayerIndex: null,
    players: [
      {
        name: playerName,
        socketID: socketID,
        isReady: false,
        cards: [],
        totalScore: 0,
        roundScore: [],
        allCardsRevealed: false,
      },
    ],
    drawPileCards: generateCards(),
    tempDrawPileCard: null,
    discardPileCards: [],
  };
  //commented out for now
  // console.log(JSON.stringify(games, null, 4));
}

export function checkIsLobbyFull(lobbyNr: number): void {
  if (games[lobbyNr].playerCount >= 8) {
    games[lobbyNr].lobbyIsFull = true;
  }
}

export function joinGame(
  lobbyNr: number,
  playerName: string,
  socketID: string
): void {
  console.log(playerName + ":" + socketID + " joined " + lobbyNr);
  const playersInGame = games[lobbyNr].players;
  playersInGame.push({
    name: playerName,
    socketID: socketID,
    isReady: false,
    cards: [],
    totalScore: 0,
    roundScore: [],
    allCardsRevealed: false,
  });
  games[lobbyNr].playerCount++;
}

export async function leaveGame(socketID: string): Promise<void> {
  const currentGame = await getGame(socketID);

  const currentGamePlayers = currentGame.players.map(
    (player) => player.socketID
  );
  const indexOfTargetPlayer = currentGamePlayers.indexOf(socketID);

  if (indexOfTargetPlayer > -1) {
    currentGame.players.splice(indexOfTargetPlayer, 1);
    currentGame.playerCount--;
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

  const randomCardDiscardPile = getRandomCard(lobbyNr);
  randomCardDiscardPile.hidden = false;
  games[lobbyNr].discardPileCards.push(randomCardDiscardPile);
}

export async function cardRevealClick(
  socketID: string,
  index: number
): Promise<void> {
  (await getPlayer(socketID)).cards[index].hidden = false;
}

export async function cardReplaceDiscardPileClick(
  socketID: string,
  lobbyNr: number,
  index: number
): Promise<void> {
  const playerCards = (await getPlayer(socketID)).cards;
  const clickedCard = (await getPlayer(socketID)).cards[index];
  const indexLastDiscardPileCard = games[lobbyNr].discardPileCards.length - 1;
  const discardPileCard =
    games[lobbyNr].discardPileCards[indexLastDiscardPileCard];

  const replaceClickedCardWithDiscardPileCard = () => {
    clickedCard.hidden = false;
    discardPileCard.hidden = false;

    playerCards.splice(index, 0, discardPileCard);
    games[lobbyNr].discardPileCards.splice(
      indexLastDiscardPileCard,
      1,
      clickedCard
    );
    playerCards.splice(index + 1, 1);
  };
  replaceClickedCardWithDiscardPileCard();
}

export async function cardReplaceDrawPileKeepClick(
  socketID: string,
  lobbyNr: number,
  index: number
): Promise<void> {
  const playerCards = (await getPlayer(socketID)).cards;
  const clickedCard = (await getPlayer(socketID)).cards[index];
  const drawPileCard = games[lobbyNr].tempDrawPileCard;

  const replaceClickedCardWithDrawPileCard = () => {
    clickedCard.hidden = false;

    const replacedCard = playerCards.splice(index, 1, drawPileCard);
    games[lobbyNr].discardPileCards.push(replacedCard[0]);
    games[lobbyNr].tempDrawPileCard = null;
  };
  replaceClickedCardWithDrawPileCard();
}

export async function checkCardsVerticalRow(
  socketID: string,
  lobbyNr: number
): Promise<void> {
  const activePlayer = await getPlayer(socketID);
  const cards = activePlayer.cards;
  const blankCard = {
    value: 0,
    imgSrc: "/cards/blank.png",
    hidden: false,
  };

  function checkRow(cardOne: number, cardTwo: number, cardThree: number): void {
    if (
      cards[cardOne].hidden === false &&
      cards[cardTwo].hidden === false &&
      cards[cardThree].hidden === false &&
      cards[cardOne].value === cards[cardTwo].value &&
      cards[cardOne].value === cards[cardThree].value
    ) {
      games[lobbyNr].discardPileCards.push(
        cards[cardOne],
        cards[cardTwo],
        cards[cardThree]
      );
      cards.splice(cardOne, 1, blankCard);
      cards.splice(cardTwo, 1, blankCard);
      cards.splice(cardThree, 1, blankCard);
    }
  }

  checkRow(0, 4, 8);
  checkRow(1, 5, 9);
  checkRow(2, 6, 10);
  checkRow(3, 7, 11);
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

export async function calculateTotalScores(socketID: string): Promise<void> {
  const currentGame = await getGame(socketID);

  function getPlayerRoundScores(index: number): number[] {
    return currentGame.players[index].roundScore;
  }

  function calculateTotalScore(roundScores: number[]): number {
    return roundScores.reduce((a, b) => {
      return a + b;
    });
  }

  currentGame.players.forEach((player, index) => {
    const playerRoundScores = getPlayerRoundScores(index);
    const newTotalScore = calculateTotalScore(playerRoundScores);

    player.totalScore = newTotalScore;
  });
}

export async function checkCardsRevealed(
  socketID: string,
  amount: number
): Promise<boolean> {
  const player = await getPlayer(socketID);
  const revealedCards = player.cards.filter((card) => card.hidden === false);

  if (revealedCards.length === amount) {
    if (revealedCards.length === 12) {
      player.allCardsRevealed = true;
      console.log("allCardsRevealed", player.allCardsRevealed);
    }
    return true;
  } else {
    return false;
  }
}

export function checkAllPlayersCardsRevealed(
  lobbyNr: number,
  amount: number
): boolean {
  const currentGame = getGameByLobby(lobbyNr);
  return currentGame.players.every((player) => {
    const revealedCards = player.cards.filter((card) => card.hidden === false);
    if (revealedCards.length === amount) {
      return true;
    }
  });
}

export function getCurrentRoundscores(lobbyNr: number): number[] {
  const currentGame = getGameByLobby(lobbyNr);
  return currentGame.players.map((player) => {
    const lastScore = player.roundScore.length - 1;
    return player.roundScore[lastScore];
  });
}

export async function getFirstActivePlayer(
  lobbyNr: number,
  socketid: string
): Promise<ActivePlayer> {
  const currentGame = await getGame(socketid);
  const roundScores = getCurrentRoundscores(lobbyNr);
  const indexHighestRoundScore = roundScores.indexOf(Math.max(...roundScores));
  currentGame.activePlayerIndex = indexHighestRoundScore;
  const { name, socketID, roundScore } = currentGame.players[
    indexHighestRoundScore
  ];

  const activePlayer: ActivePlayer = {
    name: name,
    socketID: socketID,
    roundScore: roundScore,
  };
  return activePlayer;
}

export async function getActivePlayer(socketID: string): Promise<Player> {
  const currentGame = await getGame(socketID);
  const indexActivePlayer = currentGame.activePlayerIndex;
  const activePlayer = currentGame.players[indexActivePlayer];
  return activePlayer;
}

export async function setNextActivePlayer(socketID: string): Promise<void> {
  const currentGame = await getGame(socketID);
  const indexCurrentActivePlayer = currentGame.activePlayerIndex;

  if (currentGame.players[indexCurrentActivePlayer + 1]) {
    const nextActivePlayer = currentGame.players[indexCurrentActivePlayer + 1];
    const indexNextActivePlayer = currentGame.players.indexOf(nextActivePlayer);
    currentGame.activePlayerIndex = indexNextActivePlayer;
    await handleRoundEnd(socketID);
  } else {
    currentGame.activePlayerIndex = 0;
    await handleRoundEnd(socketID);
  }
}

export async function handleRoundEnd(socketID: string): Promise<void> {
  const currentGame = await getGame(socketID);
  const activePlayer = currentGame.players[currentGame.activePlayerIndex];

  if (activePlayer.allCardsRevealed === true) {
    await calculateTotalScores(socketID);
    currentGame.roundNr = currentGame.roundNr + 1;

    // reset game cards?
    // deal new cards?
    console.log("current Game", JSON.stringify(currentGame, null, 4));
  }
}

export function getNewDrawPileCard(lobbyNr: number): Card {
  const randomCard = getRandomCard(lobbyNr);
  randomCard.hidden = false;
  games[lobbyNr].tempDrawPileCard = randomCard;
  return randomCard;
}

export function getCurrentDrawPileCard(lobbyNr: number): Card {
  return games[lobbyNr].tempDrawPileCard;
}

export function discardCurrentDrawPileCard(lobbyNr: number): void {
  const drawPileCard = games[lobbyNr].tempDrawPileCard;
  games[lobbyNr].discardPileCards.push(drawPileCard);
  games[lobbyNr].tempDrawPileCard = null;
}

// Funktion für letzte TURNS.
// Wenn alle 12 cards revealed true is, soll die Funktion ausgeführt werden.
// Bei setNextActivePlayer() checken ob der nächste Player allCardsRevealed === true hat.
// Wenn ja, dann soll das Spielende eingeleitet werden: Alle übrigen Karten sollen aufgedeckt werden und die
// Round Scores ermittelt und gespeichert werden. Popup soll die Runde zusammenfassen.
// An Frontend gameHasStarted / roundstart auf false setzen, damit dort nich geklickt werden kann.
// Bzw. kann es nach wegklicken des Popups ja direkt weitergehen mit Karten aufdecken etc.
// Der Spieler der allCardsRevealed===true hatte, sollte in der nächsten Runde anfangen nach aufdecken der Karten.
