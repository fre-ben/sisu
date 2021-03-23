import styles from "./CardGrid.module.css";

function CardGrid(onClick) {
  // Example data, will be removed later by Props handed down to CardGrid
  const players = [
    { name: "Frederik", score: 20 },
    { name: "Kalle", score: 10 },
    { name: "Eva", score: 30 },
    { name: "Louis", score: 60 },
    { name: "Frederik", score: 20 },
    { name: "Kalle", score: 10 },
    { name: "Eva", score: 30 },
    { name: "Peter", score: 30 },
  ];
  // Example data, will be removed later by Props handed down to CardGrid
  const cards = [
    { value: 1, hidden: true, src: "/cards/01.png" },
    { value: 8, hidden: true, src: "/cards/08.png" },
    { value: 1, hidden: true, src: "/cards/01.png" },
    { value: 6, hidden: false, src: "/cards/06.png" },
    { value: 1, hidden: true, src: "/cards/01.png" },
    { value: 7, hidden: true, src: "/cards/07.png" },
    { value: 1, hidden: true, src: "/cards/01.png" },
    { value: 1, hidden: true, src: "/cards/01.png" },
    { value: 1, hidden: true, src: "/cards/01.png" },
    { value: 1, hidden: true, src: "/cards/01.png" },
    { value: 12, hidden: false, src: "/cards/12.png" },
    { value: 1, hidden: true, src: "/cards/01.png" },
  ];

  const createPlayerCardGrid = cards.map((card) => (
    <img
      key={card.value}
      src={card.hidden ? "/cards/back.png" : card.src}
      onClick={onClick}
    />
  ));

  return (
    <>
      <section className={styles.container}>
        <p>
          Score: <span>{players[0].score}</span>
        </p>
        <p>{players[0].name}</p>
        <div className={styles.lines}>
          <div className={styles.cardGrid}>{createPlayerCardGrid}</div>
        </div>
      </section>
    </>
  );
}

export default CardGrid;
