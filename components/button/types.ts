import { MouseEventHandler } from "react";

export type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type JoinBtnProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  lobbyIsFull: boolean;
  hasStarted: boolean;
};
