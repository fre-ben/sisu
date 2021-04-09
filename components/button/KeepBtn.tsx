import styles from "./Button.module.css";
import { KeepDiscardBtnProps } from "./types";

function KeepBtn({ handleClick }: KeepDiscardBtnProps) {
  return (
    <button
      className={`${styles.btn} ${styles.gameBoardBtn} ${styles.keepBtn}`}
      onClick={handleClick}
    >
      <div className={styles.btnBackground}>Keep</div>
    </button>
  );
}

export default KeepBtn;
