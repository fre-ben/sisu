import styles from "./Button.module.css";
import { KeepDiscardBtnProps } from "./types";

function DiscardBtn({ handleClick }: KeepDiscardBtnProps) {
  return (
    <button
      className={`${styles.btn} ${styles.gameBoardBtn} ${styles.discardBtn}`}
      onClick={handleClick}
    >
      <div className={styles.btnBackground}>Discard</div>
    </button>
  );
}

export default DiscardBtn;
