import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { getLobbyNr } from "../../lib/functions";
import { status } from "../../server/lib/statusMessages";
import styles from "./MiscElements.module.css";
import { StatusbarProps } from "./types";

function Statusbar({ activePlayer }: StatusbarProps) {
  const { socket } = useContext(SocketContext);
  const lobbyNr = getLobbyNr();
  const [statusMessage, setStatusMessage] = useState<string>(status.PREREADY);

  useEffect(() => {
    if (!socket || !lobbyNr) {
      return;
    }

    function handleDisplayStatus(statusMessage: string) {
      setStatusMessage(statusMessage);
    }

    socket.on("display status", handleDisplayStatus);
    return () => {
      socket.off("display status", handleDisplayStatus);
    };
  }, [socket, lobbyNr, activePlayer]);

  return (
    <>
      <p className={styles.statusbar}>
        <img src="/arrow_right.svg" alt="arrow" />
        {statusMessage}
      </p>
    </>
  );
}

export default Statusbar;
