import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function DiscardBtn({ onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles.gameBoardBtn} ${styles.discardBtn}`}
      onClick={onClick}
    >
      <div className={styles.btnBackground}>Discard</div>
    </button>
  );
}

export default DiscardBtn;
