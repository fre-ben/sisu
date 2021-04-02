import { MouseEventHandler } from "react";
import JoinBtn from "../button/JoinBtn";
import styles from "./LobbyListItem.module.css";
import PlayerCount from "./PlayerCount";

export type LobbyListItemProps = {
  playerCount: number;
  lobbyNr: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  lobbyIsFull: boolean;
  hasStarted: boolean;
};

function LobbyListItem({
  playerCount,
  lobbyNr,
  onClick,
  lobbyIsFull,
  hasStarted,
}: LobbyListItemProps) {
  if (playerCount >= 8) {
    lobbyIsFull = true;
    playerCount = 8;
  }

  if (playerCount <= 0) {
    playerCount = 0;
  }

  return (
    <li className={styles.listItem}>
      <span className={styles.lobbyNr}>Lobby #{lobbyNr}</span>
      <PlayerCount playerCount={playerCount} />
      <JoinBtn
        onClick={onClick}
        lobbyIsFull={lobbyIsFull}
        hasStarted={hasStarted}
      />
    </li>
  );
}

export default LobbyListItem;
