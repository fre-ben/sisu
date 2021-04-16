import { Meta } from "@storybook/react/types-6-0";
import { SocketContextProvider } from "../../contexts/SocketContext";
import Index from "../../pages/index";
import Lobbies from "../../pages/lobbies";
import Rules from "../../pages/rules";
import User from "../../pages/user";

export default {
  title: "Pages/Main Menu",
  parameters: { layout: "fullscreen" },
} as Meta;

export const index = () => <Index />;
export const rules = () => <Rules />;
export const user = () => <User />;
export const lobbies = () => (
  <SocketContextProvider>
    <Lobbies />
  </SocketContextProvider>
);
