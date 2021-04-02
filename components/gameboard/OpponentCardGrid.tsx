import { MouseEventHandler } from "react";
import { Card } from "../../server/lib/gameTypes";
import styles from "./CardGrid.module.css";

export type CardGridProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  cards: Card[];
  name: string;
  roundScore: number[];
};

function OpponentCardGrid({
  // onClick,
  cards,
  name,
  roundScore,
}: CardGridProps) {
  const createPlayerCardGrid = cards.map((card) => (
    <img
      key={card.value}
      src={card.hidden ? "/cards/back.png" : card.imgSrc}
      // onClick={onClick}
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
