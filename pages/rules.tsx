import Head from "next/head";
import BackBtn from "../components/button/BackBtn";
import Logo from "../components/logo/Logo";
import styles from "../styles/Rules.module.css";
import Link from "next/link";

export default function Rules() {
  return (
    <>
      <Head>
        <title>How to play</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container}>
          <Logo size="big" />
          <div className={styles.menuItems}>
            <Link href="/">
              <a>
                <BackBtn />
              </a>
            </Link>
            <article className={styles.rules}>
              <p>
                Every player has 12 hidden cards (arrangd in a 3x4 cardgrid). At
                the start of the game two cards are turned face up, revealing
                the card. <br />
                The player whose two cards have the highest sum (score) goes
                first. <br />
                On your turn you can take the top card from the discard or draw
                pile. You can exchange one card (hidden or open) from your
                cardgrid. <br />
                Round ends when one player has only open/revealed cards on his
                cardgrid. <br />
                When the round ends, every player has one more turn (except the
                player, who ends the round). <br />
                Afterwards all non-revealed cards will be revealed. When all
                cards are revealed the numbers of the cards each player has will
                be added for scoring. <br />
                Game ends after one player has 100 or more points. Whoever has
                the lowest number wins.
              </p>
              <p>
                Special rule: Whenever one row of 3 cards all have the same
                value, they will be discarded and no longer scored. <br />
                Cards are ranked from -2 up to 12.
              </p>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
