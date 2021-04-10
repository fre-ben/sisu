import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { getLobbyNr } from "../../lib/functions";
import { Card } from "../../server/lib/gameTypes";
import { phase } from "../../server/lib/turnPhases";
import DiscardBtn from "../button/DiscardBtn";
import KeepBtn from "../button/KeepBtn";
import styles from "./DrawPilePrompt.module.css";

type DrawPilePrompt = {
  turnPhase: string;
};

function DrawPilePrompt({ turnPhase }: DrawPilePrompt) {
  const { socket } = useContext(SocketContext);
  const lobbyNr = getLobbyNr();
  const [drawPileCard, setDrawPileCard] = useState<Card>(null);

  useEffect(() => {
    if (!socket || !lobbyNr) {
      return;
    }

    switch (turnPhase) {
      case phase.DRAWPILEDECISION:
        socket.emit("get new drawpilecard", lobbyNr);
        break;
      default:
        socket.emit("get current drawpilecard", lobbyNr);
        break;
    }

    function handleDisplayDrawPileCard(card: Card) {
      setDrawPileCard(card);
    }

    socket.on("display new drawpilecard", (card) => {
      if (!card) {
        socket.emit("get new drawpilecard", lobbyNr);
      } else {
        handleDisplayDrawPileCard(card);
      }
    });

    socket.on("display current drawpilecard", (card) => {
      handleDisplayDrawPileCard(card);
    });

    return () => {
      socket.off("display new drawpilecard");
      socket.off("display current drawpilecard");
    };
  }, [socket, lobbyNr]);

  function handleKeepClick() {
    switch (turnPhase) {
      case phase.DRAWPILEDECISION:
        socket.emit("DRAWPILEDECISION: click keep", socket.id, lobbyNr);
        break;
      case phase.WAITTURN:
        return;
      default:
        return;
    }
  }

  function handleDiscardClick() {
    switch (turnPhase) {
      case phase.DRAWPILEDECISION:
        socket.emit("DRAWPILEDECISION: click discard", socket.id, lobbyNr);
        break;
      case phase.WAITTURN:
        return;
      default:
        return;
    }
  }

  return (
    <div className={styles.container}>
      {turnPhase === phase.DRAWPILEDECISION && (
        <div className={styles.buttons}>
          <KeepBtn handleClick={handleKeepClick} />
          <DiscardBtn handleClick={handleDiscardClick} />
        </div>
      )}
      <img
        src={drawPileCard ? drawPileCard.imgSrc : "/cards/blank.png"}
        className={styles.card}
      />
    </div>
  );
}

export default DrawPilePrompt;
