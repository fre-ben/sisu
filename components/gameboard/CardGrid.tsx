import { useContext, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { getLobbyNr } from "../../lib/functions";
import styles from "./CardGrid.module.css";
import type { PlayerCardGridProps } from "./OpponentCardGrid";

function CardGrid({
  cards,
  name,
  roundScore,
  gameHasStarted,
  turnPhase,
}: PlayerCardGridProps) {
  const { socket } = useContext(SocketContext);
  const [roundStart, setRoundStart] = useState<boolean>(false);
  const lobbyNr = getLobbyNr();

  const notClickable = `${styles.card} ${styles.notClickable}`;

  const handleCardClick = (index: number): void => {
    if (gameHasStarted && !roundStart) {
      socket.emit("cardgrid click", socket.id, lobbyNr, index);
      socket.emit(
        "check 2 cards revealed",
        socket.id,
        lobbyNr,
        (bothCardsRevealed) => {
          if (bothCardsRevealed) {
            setRoundStart(true);
          }
        }
      );
    }
    if (roundStart) {
      switch (turnPhase) {
        case "drawDecision":
          return;
        case "discardPileDecision":
          socket.emit("DISCARDPILE: replace card", socket.id, lobbyNr, index);
          break;
        case "discardPileReplaceOpen":
          alert("dpo");
          break;
        case "discardPileReplaceHidden":
          alert("dprh");
          break;
        case "waitTurn":
          return;
        default:
          return;
      }
    }
  };

  function cardStyle() {
    switch (turnPhase) {
      case "drawDecision":
        return notClickable;
      case "waitTurn":
        return notClickable;
      case "discardPileDecision":
        return styles.card;
      default:
        return styles.card;
    }
  }

  const createPlayerCardGrid = cards.map((card, index) => (
    <img
      key={index}
      src={card && card.hidden ? "/cards/back.png" : card && card.imgSrc}
      className={cardStyle()}
      onClick={() => handleCardClick(index)}
    />
  ));

  return (
    <section className={styles.container}>
      <p>
        Score: <span>{roundScore}</span>
      </p>
      <p>{name}</p>
      <div className={styles.lines}>
        <div className={styles.cardGrid}>{createPlayerCardGrid}</div>
      </div>
    </section>
  );
}

export default CardGrid;
