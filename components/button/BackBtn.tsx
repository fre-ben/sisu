import "./Button.module.css";
import styles from "./Button.module.css";
import { MouseEventHandler } from "react";

export type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function BackBtn({ onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles.backBtn} ${styles.backContainer}`}
      onClick={onClick}
    >
      <img src="/arrow.svg" alt="arrow" />
      Back
    </button>
  );
}

export default BackBtn;
