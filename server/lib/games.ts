type Game = {
  lobbyNr: number;
  playerCount: number;
  lobbyIsFull: boolean;
};

const games: unknown = {};

//lobbyNr generieren

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
