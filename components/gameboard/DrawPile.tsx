import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { getLobbyNr } from "../../lib/functions";
import { phase } from "../../server/lib/turnPhases";
import styles from "./Piles.module.css";
import type { DrawPileProps } from "./types";

function DrawPile({ turnPhase }: DrawPileProps) {
  const { socket } = useContext(SocketContext);
  const lobbyNr = getLobbyNr();
  const notClickable = `${styles.card} ${styles.notClickable}`;

  function handlePileClick() {
    switch (turnPhase) {
      case phase.DRAWDECISION:
        socket.emit("DRAWDECISION: click drawpile", socket.id, lobbyNr);
        break;
      case "waitTurn":
        return;
      default:
        return;
    }
  }

  function cardStyle() {
    switch (turnPhase) {
      case phase.DRAWDECISION:
        return styles.card;
      case "waitTurn":
        return notClickable;
      default:
        return notClickable;
    }
  }

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.drawHeadline}>Draw Pile</h2>
        <img
          src="/cards/back.png"
          className={cardStyle()}
          onClick={handlePileClick}
        />
      </section>
    </>
  );
}

export default DrawPile;
