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
    //commented out for easier reading of server log
    // drawPileCards: generateCards(),
    drawPileCards: [],
    discardPileCards: [],
  };
  //commented out for now
  // console.log(JSON.stringify(games, null, 4));
}

function checkIsLobbyFull(lobbyNr) {
  if (games[lobbyNr].playerCount >= 8) {
    games[lobbyNr].lobbyIsFull = true;
    return true;
  }
}

export function joinGame(lobbyNr, playerName, socketID) {
  if (checkIsLobbyFull(lobbyNr)) {
    console.log("Lobby is full");
    return;
  }
  console.log(playerName + ":" + socketID + " joined " + lobbyNr);
  const playersInGame = games[lobbyNr].players;
  playersInGame.push({
    name: playerName,
    socketID: socketID,
    cards: [],
    totalScore: 0,
    roundScore: [],
  });
  games[lobbyNr].playerCount++;

  console.log(JSON.stringify(games, null, 4));
}

export async function leaveGame(socketID) {
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

export function getGames() {
  return Object.values(games).map((game) => {
    return {
      lobbyNr: game.lobbyNr,
      playerCount: game.playerCount,
      lobbyIsFull: game.lobbyIsFull,
    };
  });
}

export async function getGame(socketID) {
  return Object.values(games).find((game) =>
    game.players.find((id) => id.socketID === socketID)
  );
}

export async function getPlayer(socketID) {
  const currentGame = await getGame(socketID);
  const player = currentGame.players.find((id) => id.socketID === socketID);

  return player;
}

export async function createTotalScoreList(socketID) {
  const currentGame = await getGame(socketID);

  return currentGame.players.map((player) => {
    return { name: player.name, score: player.totalScore };
  });
}
