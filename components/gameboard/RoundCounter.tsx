import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { getLobbyNr } from "../../lib/functions";
import styles from "./MiscElements.module.css";
import type { RoundCounterProps } from "./types";

function RoundCounter() {
  const { socket } = useContext(SocketContext);
  const [roundNr, setRoundNr] = useState<RoundCounterProps>(null);
  const lobbyNr = getLobbyNr();

  useEffect(() => {
    if (!socket) {
      return;
    }

    function handleDisplayRoundNr(round) {
      setRoundNr(round);
    }

    socket.on("display rounds", handleDisplayRoundNr);
    socket.emit("get rounds to display", lobbyNr);
  }, [socket, roundNr]);

  return (
    <>
      <p className={styles.roundCounter}>
        Round:<span>{roundNr}</span>
      </p>
    </>
  );
}

export default RoundCounter;
