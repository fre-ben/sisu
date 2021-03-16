import { Meta } from "@storybook/react/types-6-0";
import Logo from "./Logo";

export default {
  title: "Common/Logo",
} as Meta;

export const big = () => <Logo size="big" />;
export const small = () => <Logo size="small" />;
