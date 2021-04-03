import styles from "./Piles.module.css";
import type { PileProps } from "./types";

function DrawPile({ onClick }: PileProps) {
  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.drawHeadline}>Draw Pile</h2>
        <img
          src="/cards/back.png"
          className={styles.card}
          onClick={() => onClick}
        />
      </section>
    </>
  );
}

export default DrawPile;
