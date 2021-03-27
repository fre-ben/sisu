import Head from "next/head";
import styles from "../styles/Lobbies.module.css";
import Link from "next/link";
import Logo from "../components/logo/Logo";
import BackBtn from "../components/button/BackBtn";
import CreateBtn from "../components/button/CreateBtn";
import LobbyListItem, {
  LobbyListItemProps,
} from "../components/misc/LobbyListItem";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../contexts/SocketContext";

export default function Lobbies() {
  const router = useRouter();
  const [lobbyItems, setLobbyItems] = useState<LobbyListItemProps[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) {
      return;
    }
    function handleListGames(games) {
      setLobbyItems(games);
    }

    socket.on("list games", handleListGames);
    socket.emit("list games");
  }, [socket]);

  const goToLobby = (lobbyNr) => {
    router.push(`/game?lobby=${lobbyNr}`);
  };

  const handleJoinBtnClick = (lobbyNr) => {
    const playerName = getPlayerName();
    const socketID = getSocketID();
    socket.emit("join game", lobbyNr, playerName, socketID);
    // goToLobby(lobbyNr);
  };

  function getPlayerName() {
    return localStorage.getItem("playerName");
  }

  function getSocketID() {
    return localStorage.getItem("socketID");
  }

  const handleCreateBtnClick = () => {
    const playerName = getPlayerName();
    const socketID = getSocketID();
    socket.emit("create game", playerName, socketID);
    socket.on("pass lobbynr", (lobbyNr) => {
      goToLobby(lobbyNr);
    });
  };

  return (
    <>
      <Head>
        <title>Lobbies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container}>
          <Logo size="big" />
          <CreateBtn onClick={handleCreateBtnClick} />
          <div className={styles.pageItems}>
            <Link href="/user">
              <a>
                <BackBtn />
              </a>
            </Link>
            <ul className={styles.list}>
              {lobbyItems.map((lobby) => {
                return (
                  <LobbyListItem
                    key={lobby.lobbyNr}
                    playerCount={lobby.playerCount}
                    lobbyNr={lobby.lobbyNr}
                    onClick={() => handleJoinBtnClick(lobby.lobbyNr)}
                    lobbyIsFull={lobby.lobbyIsFull}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
