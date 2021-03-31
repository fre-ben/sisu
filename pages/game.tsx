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
import { useContext, useEffect, useState } from "react";
import { getLobbyNr, getPlayerName, getSocketID } from "../lib/functions";
import { useRouter } from "next/router";
import { PlayerForCardGrid } from "../server/lib/gameTypes";

export default function Game() {
  const { socket } = useContext(SocketContext);
  const router = useRouter();
  const lobbyNr = getLobbyNr();
  const [playerCount, setPlayerCount] = useState<number>(null);
  const [players, setPlayers] = useState<PlayerForCardGrid[]>([]);

  useEffect(() => {
    if (!socket || !lobbyNr) {
      return;
    }
    const playerName = getPlayerName();
    const socketID = getSocketID();

    function handleCurrentPlayerCount(count: number) {
      setPlayerCount(count);
    }

    function handleDisplayPlayers(players: PlayerForCardGrid[]) {
      console.log("players", players);
      setPlayers(players);
    }

    socket.emit("get playercount", lobbyNr);
    socket.on("display current playercount", handleCurrentPlayerCount);

    socket.emit("get opponent players", lobbyNr, socketID);
    socket.on("display opponent players", handleDisplayPlayers);

    socket.emit("player joined", playerName, socketID);
    socket.on("broadcast join", (player) => {
      console.log(player + " joined ");
    });
  }, [socket, lobbyNr]);

  const handleExitBtnClick = (): void => {
    if (
      confirm(
        "Do you really want to leave the game? (Reconnecting is not possible)"
      )
    ) {
      const socketID = socket.id;
      socket.emit("leave game", socketID, lobbyNr);
      router.push("/lobbies");
    }
  };

  const opponentCardGrids = players.map(
    ({ name, cards, roundScore, socketID }) => {
      return (
        <OpponentCardGrid
          key={socketID}
          cards={cards}
          name={name}
          roundScore={roundScore}
        />
      );
    }
  );

  // const renderOpponentCardGrids = () => {
  //   // if (playerCount === 8) {
  //   //   return (
  //   //     <div className={styles.opponents}>
  //   //       <div className={styles.op8row}>
  //   //         <OpponentCardGrid />
  //   //         <OpponentCardGrid />
  //   //       </div>
  //   //       <OpponentCardGrid />
  //   //       <OpponentCardGrid />
  //   //       <OpponentCardGrid />
  //   //       <OpponentCardGrid />
  //   //       <div className={styles.op8row}>
  //   //         <OpponentCardGrid />
  //   //         <OpponentCardGrid />
  //   //       </div>
  //   //     </div>
  //   //   );
  //   // }

  //   return opponentCardGrids;
  // };

  return (
    <>
      <Head>
        <title>Sisu Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.viewContainer}>
        <Logo size="small" />
        {/* Just to check if the actual count is transmitted */}
        {playerCount}
        <div className={styles.pageElements}>
          <aside className={styles.topBar}>
            <ExitBtn onClick={handleExitBtnClick} />
            <RoundCounter />
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
            <div className={styles.opponents}>{opponentCardGrids}</div>
            <div className={styles.playerCardGrid}>{/* <CardGrid /> */}</div>
          </div>
        </div>
      </main>
    </>
  );
}
