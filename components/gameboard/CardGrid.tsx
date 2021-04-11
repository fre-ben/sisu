import { useContext, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { getLobbyNr } from "../../lib/functions";
import { Card } from "../../server/lib/gameTypes";
import { phase } from "../../server/lib/turnPhases";
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

  const handleCardClick = (index: number, card: Card): void => {
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
        case phase.DRAWDECISION:
          return;
        case phase.DISCARDPILEDECISION:
          socket.emit("DISCARDPILE: replace card", socket.id, lobbyNr, index);
          break;
        case phase.DRAWPILEKEEP:
          socket.emit("DRAWPILE: replace card", socket.id, lobbyNr, index);
          break;
        case phase.DRAWPILEDISCARD:
          if (card.hidden === false) {
            socket.emit("DRAWPILE: invalid reveal card", socket.id, lobbyNr);
            return;
          }
          socket.emit("DRAWPILE: reveal card", socket.id, lobbyNr, index);
          break;
        case phase.WAITTURN:
          return;
        default:
          return;
      }
    }
  };

  function cardStyle() {
    switch (turnPhase) {
      case phase.DRAWDECISION:
        return notClickable;
      case phase.WAITTURN:
        return notClickable;
      case phase.DRAWPILEDECISION:
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
      className={
        card.imgSrc !== "/cards/blank.png" ? cardStyle() : notClickable
      }
      onClick={
        card.imgSrc !== "/cards/blank.png"
          ? () => handleCardClick(index, card)
          : () => {
              return;
            }
      }
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
