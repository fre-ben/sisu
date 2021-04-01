import { Card } from "./gameTypes";

type CardToGenerate = [Card, number];

export function generateCards(): Card[] {
  const cardsToGenerate: CardToGenerate[] = [
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

  const cards: Card[] = [];

  cardsToGenerate.forEach(([value, quantity]) => {
    cards.push(...Array(quantity).fill(value));
  });
  return cards;
}

export function generateBlankCards(): Card[] {
  const cardsToGenerate: CardToGenerate[] = [
    [
      {
        value: 0,
        imgSrc: "/cards/blank.png",
        hidden: false,
      },
      12,
    ],
  ];

  const blankCards: Card[] = [];
  cardsToGenerate.forEach(([value, quantity]) => {
    blankCards.push(...Array(quantity).fill(value));
  });

  return blankCards;
}
