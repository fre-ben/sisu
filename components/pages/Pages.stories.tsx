import { Meta } from "@storybook/react/types-6-0";
import Home from "../../pages/index";
import Rules from "../../pages/rules";
import User from "../../pages/user";

export default {
  title: "Pages/Main Menu",
  parameters: { layout: "fullscreen" },
} as Meta;

export const index = () => <Home />;
export const rules = () => <Rules />;
export const user = () => <User />;
