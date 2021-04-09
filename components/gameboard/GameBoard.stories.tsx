import { Meta } from "@storybook/react/types-6-0";
import CardGrid from "./CardGrid";
import DiscardPile from "./DiscardPile";
import DrawPile from "./DrawPile";
import OpponentCardGrid from "./OpponentCardGrid";
import RoundScoreModal from "./RoundScoreModal";
import RoundCounter from "./RoundCounter";
import Statusbar from "./Statusbar";
import TotalScore from "./TotalScore";
import { SocketContextProvider } from "../../contexts/SocketContext";
import DrawPilePrompt from "./DrawPilePrompt";

export default {
  title: "Common/Gameboard",
} as Meta;

export const drawpile = () => <DrawPile turnPhase={null} />;
export const discardpile = () => <DiscardPile card={null} turnPhase={null} />;
export const totalscore = () => <TotalScore />;
export const cardgrid = () => (
  <CardGrid
    cards={null}
    name={"Fred"}
    roundScore={[20]}
    turnPhase={null}
    gameHasStarted={null}
  />
);
export const opponentcardgrid = () => (
  <OpponentCardGrid cards={null} name={"Fred"} roundScore={[20]} />
);
export const roundscoremodal = () => <RoundScoreModal />;
export const roundcounter = () => (
  <SocketContextProvider>
    <RoundCounter />
  </SocketContextProvider>
);
export const statusbar = () => (
  <SocketContextProvider>
    <Statusbar activePlayer={null} />
  </SocketContextProvider>
);
export const drawpileprompt = () => (
  <SocketContextProvider>
    <DrawPilePrompt turnPhase={null} />
  </SocketContextProvider>
);
