import Head from "next/head";
import styles from "../styles/User.module.css";
import Link from "next/link";
import Logo from "../components/logo/Logo";
import BackBtn from "../components/button/BackBtn";
import ConfirmBtn from "../components/button/ConfirmBtn";
import NameInput from "../components/input/NameInput";

export default function User() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted!");
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
                <BackBtn onClick={() => console.log("Clicked")} />
              </a>
            </Link>
            <form className={styles.form} onSubmit={() => handleSubmit}>
              <NameInput />
              <ConfirmBtn onClick={() => console.log("clicked")} />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
