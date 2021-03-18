import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import RulesBtn from "../components/button/RulesBtn";
import StartGameBtn from "../components/button/StartGameBtn";
import Logo from "../components/logo/Logo";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const goToTest = (e) => {
    e.preventDefault();
    router.push("/test");
  };

  return (
    <>
      <Head>
        <title>Sisu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container}>
          <Logo size="big" />
          <div className={styles.menuItems}>
            <StartGameBtn onClick={goToTest} />
            <RulesBtn onClick={goToTest} />
          </div>
        </div>
      </main>
    </>
  );
}
