import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function KeepBtn({ onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles.gameBoardBtn} ${styles.keepBtn}`}
      onClick={onClick}
    >
      <div className={styles.btnBackground}>Keep</div>
    </button>
  );
}

export default KeepBtn;
