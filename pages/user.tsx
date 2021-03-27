import Head from "next/head";
import styles from "../styles/User.module.css";
import Link from "next/link";
import Logo from "../components/logo/Logo";
import BackBtn from "../components/button/BackBtn";
import ConfirmBtn from "../components/button/ConfirmBtn";
import NameInput from "../components/input/NameInput";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

export default function User() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("PlayerName is " + playerName);
    localStorage.setItem("playerName", playerName);
    router.push("/lobbies");
  };

  const [isMaxLength, setIsMaxLength] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const checkValueLength = (event) => {
    setIsMaxLength(event.target.value.length >= 11);
  };

  const onHandleChange = (event) => {
    checkValueLength(event);
    setPlayerName(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Username</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container}>
          <Logo size="big" />
          <div className={styles.pageItems}>
            <Link href="/">
              <a>
                <BackBtn />
              </a>
            </Link>
            <form className={styles.form} onSubmit={handleSubmit}>
              <NameInput
                playerName={playerName}
                onHandleChange={onHandleChange}
                isMaxLength={isMaxLength}
              />
              <ConfirmBtn />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
