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
import { generateBlankCards } from "../server/lib/cards";

export default function Game() {
  const { socket } = useContext(SocketContext);
  const router = useRouter();
  const lobbyNr = getLobbyNr();
  const blankCards = generateBlankCards();
  const [playerCount, setPlayerCount] = useState<number>(null);
  const [opponentPlayers, setOpponentPlayers] = useState<PlayerForCardGrid[]>(
    []
  );
  const [player, setPlayer] = useState<PlayerForCardGrid>(null);
  const [gameHasStarted, setGameHasStarted] = useState(false);

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
      const opponentPlayers = players.filter(
        (player) => player.socketID !== socketID
      );
      const player = players.find((player) => player.socketID === socketID);
      setOpponentPlayers(opponentPlayers);
      setPlayer(player);
    }

    socket.emit("get playercount", lobbyNr);
    socket.on("display current playercount", handleCurrentPlayerCount);

    socket.emit("get players", lobbyNr, socketID);
    socket.on("display players", handleDisplayPlayers);

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

  const handleReadyBtnClick = (): void => {
    alert("Test");
  };

  const opponentCardGrids = opponentPlayers.map(
    ({ name, cards, roundScore, socketID }) => {
      return (
        <OpponentCardGrid
          key={socketID}
          cards={gameHasStarted ? cards : blankCards}
          name={name}
          roundScore={roundScore}
        />
      );
    }
  );

  //Still saving this for the case of 8 players
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
        <div className={styles.pageElements}>
          <aside className={styles.topBar}>
            <ExitBtn onClick={handleExitBtnClick} />
            <RoundCounter />
            <Statusbar
              statusMessage={"Start game if all players are connected"}
            />
            {!player.isReady && <ReadyBtn onClick={handleReadyBtnClick} />}
          </aside>
          <aside className={styles.sideBar}>
            <TotalScore />
            <DrawPile onClick={() => alert("click")} />
            <DiscardPile onClick={() => alert("click")} />
          </aside>
          <div className={styles.gameElements8Player}>
            <div className={styles.opponents}>{opponentCardGrids}</div>
            <div className={styles.playerCardGrid}>
              {player && (
                <CardGrid
                  cards={gameHasStarted ? player.cards : blankCards}
                  name={player.name}
                  roundScore={player.roundScore}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
