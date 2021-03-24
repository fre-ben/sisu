import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function RestartBtn({ onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles.gameBoardBtn} ${styles.restartBtn}`}
      onClick={onClick}
    >
      <div className={styles.btnBackground}>
        Again? <span>Restart Game</span>
      </div>
    </button>
  );
}

export default RestartBtn;
