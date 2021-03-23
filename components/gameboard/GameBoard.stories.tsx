import { Meta } from "@storybook/react/types-6-0";
import CardGrid from "./CardGrid";
import DiscardPile from "./DiscardPile";
import DrawPile from "./DrawPile";
import OpponentCardGrid from "./OpponentCardGrid";
import TotalScore from "./TotalScore";

export default {
  title: "Common/Gameboard",
} as Meta;

export const drawpile = () => <DrawPile onClick={() => alert("test")} />;
export const discardpile = () => <DiscardPile onClick={() => alert("test")} />;
export const totalscore = () => <TotalScore />;
export const cardgrid = () => <CardGrid />;
export const opponentcardgrid = () => <OpponentCardGrid />;
