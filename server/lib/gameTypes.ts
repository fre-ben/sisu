export type Game = {
  lobbyNr: number;
  roundNr: number;
  playerCount: number;
  lobbyIsFull: boolean;
  nextPlayer: string;
  players: Player[];
  drawPileCards: Card[];
  discardPileCards: Card[];
};

export type Player = {
  name: string;
  socketID: string;
  cards: Card[];
  totalScore: number;
  roundScore: number[];
};

export type Card = {
  value: number;
  imgSrc: string;
  hidden: boolean;
};
