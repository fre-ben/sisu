import Head from "next/head";
import IndexPage from "../components/pages/Index";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sisu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <IndexPage />
      </main>
    </div>
  );
}
