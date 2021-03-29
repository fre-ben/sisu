import Head from "next/head";
import styles from "../styles/Game.module.css";
import Logo from "../components/logo/Logo";
import ExitBtn from "../components/button/ExitBtn";
import RoundCounter from "../components/gameboard/RoundCounter";
import Statusbar from "../components/gameboard/Statusbar";
import ReadyBtn from "../components/button/ReadyBtn";
import TotalScore from "../components/gameboard/TotalScore";
import DrawPile from "../components/gameboard/DrawPile";
import DiscardPile from "../components/gameboard/DiscardPile";
import CardGrid from "../components/gameboard/CardGrid";
import OpponentCardGrid from "../components/gameboard/OpponentCardGrid";
import { SocketContext } from "../contexts/SocketContext";
import { useContext, useEffect } from "react";
import { getLobbyNr, getPlayerName, getSocketID } from "../lib/functions";
import { useRouter } from "next/router";

export default function Game() {
  const { socket } = useContext(SocketContext);
  const router = useRouter();

  const lobbyNr = getLobbyNr();
  console.log(lobbyNr);

  useEffect(() => {
    if (!socket) {
      return;
    }
    const playerName = getPlayerName();
    const socketID = getSocketID();

    socket.emit("player joined", playerName, socketID);
    socket.on("broadcast join", (player) => {
      console.log(player + " joined ");
    });
  }, []);

  const handleExitBtnClick = () => {
    const socketID = socket.id;
    socket.emit("leave game", socketID, lobbyNr);
    router.push("/lobbies");
  };

  return (
    <>
      <Head>
        <title>Sisu Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.viewContainer}>
        <Logo size="small" />
        <div className={styles.pageElements}>
          <aside className={styles.topBar}>
            <ExitBtn onClick={handleExitBtnClick} />
            <RoundCounter roundNr={1} />
            <Statusbar
              statusMessage={"Start game if all players are connected"}
            />
            <ReadyBtn onClick={() => alert("click")} />
          </aside>
          <aside className={styles.sideBar}>
            <TotalScore />
            <DrawPile onClick={() => alert("click")} />
            <DiscardPile onClick={() => alert("click")} />
          </aside>
          <div className={styles.gameElements8Player}>
            <div className={styles.opponents}>
              <div className={styles.op8row}>
                <OpponentCardGrid />
                <OpponentCardGrid />
              </div>
              <OpponentCardGrid />
              <OpponentCardGrid />
              <OpponentCardGrid />
              <OpponentCardGrid />
              <div className={styles.op8row}>
                <OpponentCardGrid />
                <OpponentCardGrid />
              </div>
            </div>
            <div className={styles.playerCardGrid}>
              <CardGrid />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
