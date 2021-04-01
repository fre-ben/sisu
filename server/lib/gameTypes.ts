export type Game = {
  lobbyNr: number;
  roundNr: number;
  playerCount: number;
  lobbyIsFull: boolean;
  hasStarted: boolean;
  nextPlayer: string;
  players: Player[];
  drawPileCards: Card[];
  discardPileCards: Card[];
};

export type GamesType = {
  [lobbyNr: number]: Game;
};

export type GameForLobby = Pick<
  Game,
  "lobbyNr" | "playerCount" | "lobbyIsFull"
>;

export type Player = {
  name: string;
  socketID: string;
  isReady: boolean;
  cards: Card[];
  totalScore: number;
  roundScore: number[];
};

export type PlayerForCardGrid = Pick<
  Player,
  "name" | "cards" | "roundScore" | "socketID" | "isReady"
>;

export type PlayerScoreList = Pick<Player, "name" | "totalScore">;

export type Card = {
  value: number;
  imgSrc: string;
  hidden: boolean;
};

export type CardToGenerate = [Card, number];
