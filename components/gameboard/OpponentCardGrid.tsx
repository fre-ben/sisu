import type { Card } from "../../server/lib/gameTypes";
import styles from "./CardGrid.module.css";

export type CardGridProps = {
  onClick?(index: number): void;
  cards: Card[];
  name: string;
  roundScore: number[];
};

function OpponentCardGrid({ cards, name, roundScore }: CardGridProps) {
  const createPlayerCardGrid = cards.map((card, index) => (
    <img key={index} src={card.hidden ? "/cards/back.png" : card.imgSrc} />
  ));

  return (
    <section className={styles.opponentContainer}>
      <p>
        Score: <span>{roundScore}</span>
      </p>
      <p>{name}</p>
      <div className={styles.oppCardGrid}>{createPlayerCardGrid}</div>
    </section>
  );
}

export default OpponentCardGrid;
