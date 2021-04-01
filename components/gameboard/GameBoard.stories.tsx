import { Meta, Story } from "@storybook/react/types-6-0";
import CardGrid from "./CardGrid";
import DiscardPile from "./DiscardPile";
import DrawPile from "./DrawPile";
import OpponentCardGrid from "./OpponentCardGrid";
import RoundScoreModal from "./RoundScoreModal";
import RoundCounter from "./RoundCounter";
import Statusbar from "./Statusbar";
import TotalScore from "./TotalScore";
import { StatusbarProps } from "./types";
import { SocketContextProvider } from "../../contexts/SocketContext";

export default {
  title: "Common/Gameboard",
} as Meta;

const TemplateStatusbar: Story<StatusbarProps> = (args) => (
  <Statusbar {...args} />
);

export const StatusBar = TemplateStatusbar.bind({});

StatusBar.args = {
  statusMessage: "Start game if all players are connected.",
};

export const drawpile = () => <DrawPile onClick={() => alert("test")} />;
export const discardpile = () => <DiscardPile onClick={() => alert("test")} />;
export const totalscore = () => <TotalScore />;
export const cardgrid = () => <CardGrid />;
// export const opponentcardgrid = () => <OpponentCardGrid />;
export const roundscoremodal = () => <RoundScoreModal />;
export const roundcounter = () => (
  <SocketContextProvider>
    <RoundCounter />
  </SocketContextProvider>
);
