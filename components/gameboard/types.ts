import { MouseEventHandler } from "react";
import { ActivePlayer, Card } from "../../server/lib/gameTypes";

export type DiscardPileProps = {
  onPileClick?: MouseEventHandler<HTMLImageElement>;
  card: Card;
  turnPhase: string;
};

export type DrawPileProps = Pick<DiscardPileProps, "turnPhase">;

export type RoundCounterProps = {
  roundNr: number;
};

export type StatusbarProps = {
  activePlayer: ActivePlayer;
};
