import Head from "next/head";
import LogoMain from "../components/logo/Logo_main";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LogoMain />
      </main>
    </div>
  );
}
