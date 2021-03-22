import Head from "next/head";
import styles from "../styles/User.module.css";
import Link from "next/link";
import Logo from "../components/logo/Logo";
import BackBtn from "../components/button/BackBtn";
import ConfirmBtn from "../components/button/ConfirmBtn";
import NameInput from "../components/input/NameInput";
import { useRouter } from "next/dist/client/router";

export default function User() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/lobbies");
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
              <NameInput />
              <ConfirmBtn />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
