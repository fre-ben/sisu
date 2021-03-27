import { Meta, Story } from "@storybook/react/types-6-0";
import NameInput from "./NameInput";

export default {
  title: "Common/Input",
} as Meta;

const Template: Story = (args) => (
  <NameInput
    isMaxLength={null}
    playerName={"Test"}
    onHandleChange={null}
    {...args}
  />
);

export const Name = Template.bind({});

Name.args = {};
