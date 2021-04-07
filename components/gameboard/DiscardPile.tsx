import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { getLobbyNr } from "../../lib/functions";
import styles from "./Piles.module.css";
import type { DiscardPileProps } from "./types";

function DiscardPile({ turnPhase, card }: DiscardPileProps) {
  const { socket } = useContext(SocketContext);
  const lobbyNr = getLobbyNr();

  function handlePileClick() {
    switch (turnPhase) {
      case "drawDecision":
        alert("Drawdecision");
        break;
      case "discardPileDecision":
        alert("DiscardPileDecision");
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

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.discardHeadline}>Discard Pile</h2>
        <img
          src={card ? card.imgSrc : "/cards/blank.png"}
          className={styles.card}
          onClick={handlePileClick}
        />
      </section>
    </>
  );
}

export default DiscardPile;
