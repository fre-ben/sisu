import { generateCards } from "./cards";
import { Game } from "./gameTypes";

type GamesType = {
  [lobbyNr: number]: Game;
};

const games: GamesType = {};

export function createGame(
  lobbyNr: number,
  userName: string,
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
        name: userName,
        socketID: socketID,
        cards: [],
        totalScore: 0,
        roundScore: [],
      },
    ],
    drawPileCards: generateCards(),
    discardPileCards: [],
  };
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
