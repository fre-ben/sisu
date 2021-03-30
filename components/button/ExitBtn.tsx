import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function ExitBtn({ onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles.exitBtn} ${styles.backContainer}`}
      onClick={onClick}
    >
      <img src="/arrow.svg" alt="arrow" />
      Exit
    </button>
  );
}

export default ExitBtn;
