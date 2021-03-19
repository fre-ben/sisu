import { Meta, Story } from "@storybook/react/types-6-0";
import PlayerCount, { PlayerCountProps } from "./PlayerCount";

export default {
  title: "Common/Misc",
} as Meta;

const Template: Story<PlayerCountProps> = (args) => <PlayerCount {...args} />;

export const Playercounter = Template.bind({});

Playercounter.args = {
  playerCount: 0,
};
