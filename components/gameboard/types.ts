import { MouseEventHandler } from "react";
import { ActivePlayer, Card } from "../../server/lib/gameTypes";

export type PileProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type DiscardPileProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  card: Card;
};

export type RoundCounterProps = {
  roundNr: number;
};

export type StatusbarProps = {
  activePlayer: ActivePlayer;
};
