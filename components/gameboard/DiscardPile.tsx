import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { getLobbyNr } from "../../lib/functions";
import styles from "./Piles.module.css";
import type { DiscardPileProps } from "./types";

function DiscardPile({ turnPhase, card }: DiscardPileProps) {
  const { socket } = useContext(SocketContext);
  const lobbyNr = getLobbyNr();
  const notClickable = `${styles.card} ${styles.notClickable}`;

  function handlePileClick() {
    switch (turnPhase) {
      case "drawDecision":
        socket.emit("DRAWDECISION: click discardpile", socket.id, lobbyNr);
        break;
      case "discardPileDecision":
        return;
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

  function cardStyle() {
    switch (turnPhase) {
      case "drawDecision":
        return styles.card;
      case "waitTurn":
        return notClickable;
      case "discardPileDecision":
        return notClickable;
      default:
        return notClickable;
    }
  }

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.discardHeadline}>Discard Pile</h2>
        <img
          src={card ? card.imgSrc : "/cards/blank.png"}
          className={cardStyle()}
          onClick={handlePileClick}
        />
      </section>
    </>
  );
}

export default DiscardPile;
