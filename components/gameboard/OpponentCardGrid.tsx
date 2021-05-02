import type { Card } from "../../server/lib/gameTypes";
import styles from "./CardGrid.module.css";

export type CardGridProps = {
  cards: Card[];
  name: string;
  roundScore: number;
};

export type PlayerCardGridProps = {
  cards: Card[];
  name: string;
  roundScore: number;
  gameHasStarted: boolean;
  turnPhase: string;
};

function OpponentCardGrid({ cards, name, roundScore }: CardGridProps) {
  const createPlayerCardGrid = cards.map((card, index) => (
    <img
      key={index}
      src={card && card.hidden ? "/cards/back.png" : card && card.imgSrc}
    />
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
