export const status = {
  PREREADY: "Start game if all players are connected",
  PRESTART: "Reveal two hidden cards on your grid to start the round",
  PRESTARTWAIT: "Wait for other players to reveal two cards",
  WAITTURN: (activePlayerName: string) => {
    return `It's ${activePlayerName}'s turn. Please wait`;
  },
  DRAWDECISION: "Draw card from draw pile or discard pile",
  DRAWPILEDECISION: "Do you want to keep or discard your drawn card?",
  DRAWPILEDISCARD:
    "Card added to discard pile. Reveal a hidden card on your grid",
  DRAWDISCARDPILEKEEP: "Replace open or hidden card on your grid",
  DRAWDISCARDPILEKEEPOPEN:
    "Replaced open card. Replaced card added to discard pile",
  DRAWDISCARDPILEKEEPHIDDEN:
    "Replaced hidden card. Replaced card added to discard pile",
  ROUNDEND: "Round ended! Press continue to get to the next round",
  GAMEEND: `${null} lost (reached total score of ${null}). Game ended!`,
};
