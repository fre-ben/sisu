export function generateCards() {
  const cardsToGenerate = [
    [
      {
        value: -2,
        imgSrc: "/cards/m2.png",
        hidden: true,
      },
      5,
    ],
    [
      {
        value: -1,
        imgSrc: "/cards/m1.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 0,
        imgSrc: "/cards/00.png",
        hidden: true,
      },
      15,
    ],
    [
      {
        value: 1,
        imgSrc: "/cards/01.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 2,
        imgSrc: "/cards/02.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 3,
        imgSrc: "/cards/03.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 4,
        imgSrc: "/cards/04.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 5,
        imgSrc: "/cards/05.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 6,
        imgSrc: "/cards/06.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 7,
        imgSrc: "/cards/07.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 8,
        imgSrc: "/cards/08.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 9,
        imgSrc: "/cards/09.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 10,
        imgSrc: "/cards/10.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 11,
        imgSrc: "/cards/11.png",
        hidden: true,
      },
      10,
    ],
    [
      {
        value: 12,
        imgSrc: "/cards/12.png",
        hidden: true,
      },
      10,
    ],
  ];

  const cards = [];

  cardsToGenerate.forEach(([value, quantity]) => {
    cards.push(...Array(quantity).fill(value));
  });
  return cards;
}
