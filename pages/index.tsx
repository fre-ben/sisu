import Head from "next/head";
import StartGameBtn from "../components/button/StartGameBtn";
import Logo from "../components/logo/Logo";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Logo size="big" />
        <Logo size="small" />
        <StartGameBtn />
      </main>
    </div>
  );
}
