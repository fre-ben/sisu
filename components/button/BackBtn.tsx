import "./Button.module.css";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";

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
