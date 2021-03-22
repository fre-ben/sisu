import styles from "./Piles.module.css";
import { PileProps } from "./types";

function DiscardPile({ onClick }: PileProps) {
  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.discardHeadline}>Discard Pile</h2>
        <img
          src="/cards/none.png"
          className={styles.card}
          onClick={() => onClick}
        />
      </section>
    </>
  );
}

export default DiscardPile;
