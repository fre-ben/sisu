import { MouseEventHandler } from "react";
import { ActivePlayer, Card } from "../../server/lib/gameTypes";

export type PileProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type DiscardPileProps = {
  onPileClick?: MouseEventHandler<HTMLImageElement>;
  card: Card;
  turnPhase: string;
};

export type RoundCounterProps = {
  roundNr: number;
};

export type StatusbarProps = {
  activePlayer: ActivePlayer;
};
