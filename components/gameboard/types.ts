import { MouseEventHandler } from "react";

export type PileProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type RoundCounterProps = {
  roundNr: number;
};

export type StatusbarProps = {
  statusMessage: string;
};
