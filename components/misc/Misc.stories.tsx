import { Meta, Story } from "@storybook/react/types-6-0";
import LobbyListItem, { LobbyListItemProps } from "./LobbyListItem";
import PlayerCount, { PlayerCountProps } from "./PlayerCount";

export default {
  title: "Common/Misc",
} as Meta;

const Template: Story<PlayerCountProps> = (args) => <PlayerCount {...args} />;
const TemplateListItem: Story<LobbyListItemProps> = (args) => (
  <LobbyListItem {...args} />
);

export const Playercounter = Template.bind({});

Playercounter.args = {
  playerCount: 0,
};

export const Lobbylistitem = TemplateListItem.bind({});

Lobbylistitem.args = {
  playerCount: 4,
  lobbyNr: 1,
  onClick: null,
  lobbyIsFull: false,
};
