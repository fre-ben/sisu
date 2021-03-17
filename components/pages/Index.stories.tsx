import { Meta } from "@storybook/react/types-6-0";
import IndexPage from "./Index";

export default {
  title: "Pages/Main Menu",
  parameters: { layout: "fullscreen" },
} as Meta;

export const index = () => <IndexPage />;
