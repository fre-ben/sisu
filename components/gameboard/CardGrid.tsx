import styles from "./CardGrid.module.css";
import type { CardGridProps } from "./OpponentCardGrid";

function CardGrid({ onClick, cards, name, roundScore }: CardGridProps) {
  const createPlayerCardGrid = cards.map((card) => (
    <img
      key={card.value}
      src={card.hidden ? "/cards/back.png" : card.imgSrc}
      // onClick={onClick}
    />
  ));

  return (
    <section className={styles.container}>
      <p>
        Score: <span>{roundScore}</span>
      </p>
      <p>{name}</p>
      <div className={styles.lines}>
        <div className={styles.cardGrid}>{createPlayerCardGrid}</div>
      </div>
    </section>
  );
}

export default CardGrid;
