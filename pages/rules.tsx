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
                <BackBtn onClick={() => console.log("Clicked")} />
              </a>
            </Link>
            <article className={styles.rules}>
              <p>
                Prow scuttle parrel provost Sail ho shrouds spirits boom
                mizzenmast yardarm. Pinnace holystone mizzenmast quarter crows
                nest nipperkin grog yardarm hempen halter furl. Swab barque
                interloper chantey doubloon starboard grog black jack gangway
                rutters. Deadlights jack lad schooner scallywag dance the hempen
                jig carouser broadside cable strike colors. Bring a spring upon
                her cable holystone blow the man down spanker Shiver me timbers
                to go on account lookout wherry doubloon chase. Belay yo-ho-ho
                keelhaul squiffy black spot yardarm spyglass sheet transom heave
                to. Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
                gangway.
              </p>
              <p>
                Case shot Shiver me timbers gangplank crack Jennys tea cup
                ballast Blimey lee snow crows nest rutters. Fluke jib scourge of
                the seven seas boatswain schooner gaff booty Jack Tar transom
                spirits. Prow scuttle parrel provost Sail ho shrouds spirits
                boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter
                crows nest nipperkin grog yardarm hempen halter furl. Swab
                barque interloper chantey doubloon starboard grog black jack
                gangway rutters. Deadlights jack lad schooner scallywag dance
                the hempen jig carouser broadside cable strike colors. Bring a
                spring upon her cable holystone blow the man down spanker Shiver
                me timbers to go on account lookout wherry doubloon chase. Belay
                yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet
                transom heave to. Trysail Sail ho Corsair red ensign hulk
                smartly boom jib rum gangway. Case shot Shiver me timbers
                gangplank crack Jennys tea cup ballast Blimey lee snow crows
                nest rutters. Fluke jib scourge of the seven seas boatswain
                schooner gaff booty Jack Tar transom spirits.
              </p>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
