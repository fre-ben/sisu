import styles from "./Piles.module.css";
import { DiscardPileProps } from "./types";

function DiscardPile({ onClick, card }: DiscardPileProps) {
  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.discardHeadline}>Discard Pile</h2>
        <img
          key={card ? card.value : ""}
          src={card ? card.imgSrc : "/cards/blank.png"}
          className={styles.card}
          onClick={() => onClick}
        />
      </section>
    </>
  );
}

export default DiscardPile;
