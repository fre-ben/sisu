import { Meta } from "@storybook/react/types-6-0";
import LogoMain from "./Logo_main";
import LogoSmall from "./Logo_small";

export default {
  title: "Common/Logo",
} as Meta;

export const main = () => LogoMain();
export const small = () => LogoSmall();
