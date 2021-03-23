import styles from "./Score.module.css";

function TotalScore() {
  // Example data, will be removed later by Props handed down to TotalScore
  const players = [
    { name: "Frederik", score: 20 },
    { name: "Kalle", score: 10 },
    { name: "Eva", score: 30 },
    { name: "Louis", score: 60 },
    { name: "Frederik", score: 20 },
    { name: "Kalle", score: 10 },
    { name: "Eva", score: 30 },
    { name: "Peter", score: 30 },
  ];

  const createTotalPlayerScoreList = players.map((player) => (
    <li key={player.name} className={styles.playerListItem}>
      <span className={styles.playerName}>{player.name}</span>{" "}
      <span className={styles.playerScore}>{player.score}</span>
    </li>
  ));

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.totalScoreHeadline}>Total Score</h2>
        <ul>{createTotalPlayerScoreList}</ul>
      </section>
    </>
  );
}

export default TotalScore;
