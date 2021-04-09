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
        socket.emit("get drawpilecard", lobbyNr);
        break;
    }

    function handleDisplayDrawPileCard(card: Card) {
      setDrawPileCard(card);
    }

    socket.on("display drawpilecard", (card) => {
      if (!card) {
        socket.emit("get drawpilecard", lobbyNr);
      } else {
        handleDisplayDrawPileCard(card);
      }
    });

    return () => {
      socket.off("display drawpilecard");
    };
  }, [socket, lobbyNr]);

  function handleKeepClick() {
    switch (turnPhase) {
      case phase.DRAWPILEDECISION:
        socket.emit("DRAWPILEDECISION: click keep", socket.id, lobbyNr);
        break;
      case phase.WAITTURNDRAWPILEDECISION:
        return;
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
      case phase.WAITTURNDRAWPILEDECISION:
        return;
      case phase.WAITTURN:
        return;
      default:
        return;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <KeepBtn handleClick={handleKeepClick} />
        <DiscardBtn handleClick={handleDiscardClick} />
      </div>
      <img
        src={drawPileCard ? drawPileCard.imgSrc : "/cards/blank.png"}
        className={styles.card}
      />
    </div>
  );
}

export default DrawPilePrompt;
