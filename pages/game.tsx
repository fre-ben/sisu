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
import { getLobbyNr, getSocketID } from "../lib/functions";
import { useRouter } from "next/router";
import type {
  ActivePlayer,
  Card,
  PlayerForCardGrid,
} from "../server/lib/gameTypes";
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
  const [discardPileCard, setDiscardPileCard] = useState<Card>(null);
  const [gameHasStarted, setGameHasStarted] = useState<boolean>(false);
  const [activePlayer, setActivePlayer] = useState<ActivePlayer>(null);
  const [turnPhase, setTurnPhases] = useState<string>(null);

  useEffect(() => {
    if (!socket || !lobbyNr) {
      return;
    }
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

    function handleDisplayDiscardPile(card: Card) {
      setDiscardPileCard(card);
    }

    socket.emit("get discardpile", lobbyNr);
    socket.on("display discardpile", handleDisplayDiscardPile);

    socket.emit("get playercount", lobbyNr);
    socket.on("display current playercount", handleCurrentPlayerCount);

    socket.emit("get players", lobbyNr, socketID);
    socket.on("display players", handleDisplayPlayers);

    socket.on("set first active player", setActivePlayer);

    socket.on("set turn phase", setTurnPhases);

    return () => {
      socket.off("display discardpile", handleDisplayDiscardPile);
      socket.off("display current playercount", handleCurrentPlayerCount);
      socket.off("display players", handleDisplayPlayers);
      socket.off("set first active player", setActivePlayer);
    };
  }, [socket, lobbyNr]);

  const handleExitBtnClick = (): void => {
    if (
      confirm(
        "Do you really want to leave the game? (Reconnecting is not possible)"
      )
    ) {
      socket.emit("leave game", socket.id, lobbyNr);
      router.push("/lobbies");
    }
  };

  const handleReadyBtnClick = (): void => {
    socket.emit("player is ready", socket.id, lobbyNr);
    socket.emit("check all players ready", lobbyNr);
    socket.on("all players ready", (game) => {
      setGameHasStarted(game.hasStarted);
    });
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

  const opponentsLayout =
    playerCount <= 7
      ? {
          gridTemplateColumns: `repeat(${playerCount - 1}, 1fr)`,
        }
      : {
          gridTemplateColumns: `repeat(6, 1fr)`,
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
            <RoundCounter />
            <Statusbar activePlayer={activePlayer} />
            {playerCount >= 2 && player && !player.isReady && (
              <ReadyBtn onClick={handleReadyBtnClick} />
            )}
          </aside>
          <aside className={styles.sideBar}>
            <TotalScore />
            <DrawPile onClick={() => alert("click")} />
            <DiscardPile card={discardPileCard} turnPhase={turnPhase} />
          </aside>
          <div className={styles.gameElements8Player}>
            <div className={styles.opponents} style={opponentsLayout}>
              {opponentCardGrids}
            </div>
            <div className={playerCount === 8 && styles.playerCardGrid}>
              {player && (
                <CardGrid
                  cards={gameHasStarted ? player.cards : blankCards}
                  name={player.name}
                  roundScore={player.roundScore}
                  gameHasStarted={gameHasStarted}
                  turnPhase={turnPhase}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
