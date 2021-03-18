import { Meta } from "@storybook/react/types-6-0";
import Home from "../../pages/index";
import Rules from "../../pages/rules";

export default {
  title: "Pages/Main Menu",
  parameters: { layout: "fullscreen" },
} as Meta;

export const index = () => <Home />;
export const rules = () => <Rules />;
