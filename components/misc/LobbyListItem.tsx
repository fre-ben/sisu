import { MouseEventHandler } from "react";
import JoinBtn from "../button/JoinBtn";
import "./LobbyListItem.module.css";
import styles from "./LobbyListItem.module.css";
import PlayerCount from "./PlayerCount";

export type LobbyListItemProps = {
  playerCount: number;
  lobbyNr: number;
  onClick: MouseEventHandler;
};

function LobbyListItem({ playerCount, lobbyNr, onClick }: LobbyListItemProps) {
  return (
    <li className={styles.listItem}>
      <span className={styles.lobbyNr}>Lobby #{lobbyNr}</span>
      <PlayerCount playerCount={playerCount} />
      <JoinBtn onClick={onClick} />
    </li>
  );
}

export default LobbyListItem;
