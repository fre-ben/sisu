export type Game = {
  lobbyNr: number;
  roundNr: number;
  playerCount: number;
  lobbyIsFull: boolean;
  hasStarted: boolean;
  activePlayerIndex: number;
  players: Player[];
  drawPileCards: Card[];
  tempDrawPileCard: Card;
  discardPileCards: Card[];
  currentRoundScores: CurrentRoundScore[];
};

export type GamesType = {
  [lobbyNr: number]: Game;
};

export type GameForLobby = Pick<
  Game,
  "lobbyNr" | "playerCount" | "lobbyIsFull" | "hasStarted"
>;

export type Player = {
  name: string;
  socketID: string;
  isReady: boolean;
  cards: Card[];
  totalScore: number;
  roundScore: number[];
  allCardsRevealed: boolean;
};

export type PlayerForCardGrid = Pick<
  Player,
  "name" | "cards" | "roundScore" | "socketID" | "isReady"
>;

export type PlayerScoreList = Pick<Player, "name" | "totalScore">;

export type PlayerRoundScore = Pick<Player, "name" | "roundScore">;

export type ActivePlayer = Pick<Player, "name" | "socketID" | "roundScore">;

export type CurrentRoundScore = Pick<Player, "socketID" | "roundScore">;

export type Card = {
  id?: number;
  value: number;
  imgSrc: string;
  hidden: boolean;
};

export type CardToGenerate = [Card, number];
