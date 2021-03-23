import ContinueBtn from "../button/Continue";
import styles from "./MiscElements.module.css";

function RoundScoreModal(onClick) {
  // Example data, will be removed later by Props handed down to CardGrid
  const players = [
    { name: "Frederik", score: 20 },
    { name: "Kalle", score: 10 },
    { name: "Eva", score: 30 },
    { name: "Louis", score: 60 },
    { name: "Boris", score: 20 },
    { name: "Kalle", score: 10 },
    { name: "Eva", score: 30 },
    { name: "Peter", score: 30 },
  ];

  const createRoundScoreList = players.map((player) => (
    <li key={player.name} className={styles.playerListItem}>
      <span className={styles.playerName}>{player.name}</span>{" "}
      <span className={styles.playerScore}>{player.score}</span>
    </li>
  ));

  return (
    <div className={styles.modalContainer}>
      <p>Round Score</p>
      <ul className={styles.scoreList}>{createRoundScoreList}</ul>
      <ContinueBtn onClick={onClick} />
    </div>
  );
}

export default RoundScoreModal;
