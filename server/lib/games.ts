import { generateCards } from "./cards";
import { Game } from "./gameTypes";

type GamesType = {
  [lobbyNr: number]: Game;
};

const games: GamesType = {};

export function createGame(
  lobbyNr: number,
  playerName: string,
  socketID: string
) {
  console.log("Game created on server side");
  games[lobbyNr] = {
    lobbyNr,
    roundNr: 1,
    playerCount: 1,
    lobbyIsFull: false,
    nextPlayer: "",
    players: [
      {
        name: playerName,
        socketID: socketID,
        cards: [],
        totalScore: 0,
        roundScore: [],
      },
    ],
    drawPileCards: generateCards(),
    discardPileCards: [],
  };
  console.log(JSON.stringify(games, null, 4));
}

export function getGames() {
  return Object.values(games).map((game) => {
    return {
      lobbyNr: game.lobbyNr,
      playerCount: game.playerCount,
      lobbyIsFull: game.lobbyIsFull,
    };
  });
}
