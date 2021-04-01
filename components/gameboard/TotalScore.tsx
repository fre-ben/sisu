import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { getLobbyNr } from "../../lib/functions";
import { PlayerScoreList } from "../../server/lib/gameTypes";
import styles from "./Score.module.css";
type ScoreListProps = {
  name: string;
  totalScore: number;
};

function TotalScore() {
  const { socket } = useContext(SocketContext);
  const [scoreList, setScoreList] = useState<ScoreListProps[]>([]);
  const lobbyNr = getLobbyNr();

  const renderScoreList = scoreList.map(({ name, totalScore }) => {
    return (
      <li key={name} className={styles.playerListItem}>
        <span className={styles.playerName}>{name}</span>
        <span className={styles.playerScore}>{totalScore}</span>
      </li>
    );
  });

  useEffect(() => {
    if (!socket || !lobbyNr) {
      return;
    }
    function handleDisplayScores(scores: PlayerScoreList[]) {
      setScoreList(scores);
    }

    socket.on("display scores", handleDisplayScores);
    socket.emit("get scores to display", lobbyNr);
  }, [socket, lobbyNr]);

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.totalScoreHeadline}>Total Score</h2>
        <ul>{renderScoreList}</ul>
      </section>
    </>
  );
}

export default TotalScore;
