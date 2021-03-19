import "./PlayerCount.module.css";
import styles from "./PlayerCount.module.css";

export type PlayerCountProps = {
  playerCount: number;
};

function PlayerCount({ playerCount }: PlayerCountProps) {
  const maxPlayers = 8;

  return (
    <div className={styles.container}>
      <span>
        {playerCount}/{maxPlayers}
      </span>
      <img src="/players.svg" alt="players" />
    </div>
  );
}

export default PlayerCount;
