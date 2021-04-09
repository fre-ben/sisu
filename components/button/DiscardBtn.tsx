import styles from "./Button.module.css";
import { KeepDiscardBtnProps } from "./types";

function DiscardBtn({ turnPhase }: KeepDiscardBtnProps) {
  return (
    <button
      className={`${styles.btn} ${styles.gameBoardBtn} ${styles.discardBtn}`}
      onClick={null}
    >
      <div className={styles.btnBackground}>Discard</div>
    </button>
  );
}

export default DiscardBtn;
