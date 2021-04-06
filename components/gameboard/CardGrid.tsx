import styles from "./CardGrid.module.css";
import type { CardGridProps } from "./OpponentCardGrid";

function CardGrid({ onCardClick, cards, name, roundScore }: CardGridProps) {
  const createPlayerCardGrid = cards.map((card, index) => (
    <img
      key={index}
      src={card.hidden ? "/cards/back.png" : card.imgSrc}
      onClick={() => onCardClick(index)}
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
