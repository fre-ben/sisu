import { Game, Player, Card } from "./gameTypes";

const games: unknown = {};

export function createGame(lobbyNr) {
  console.log("Game created on server side");
  games[lobbyNr] = { lobbyNr, playerCount: 1, lobbyIsFull: false };
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
