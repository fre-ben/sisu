import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function ReadyBtn({ onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles.readyBtn}`} onClick={onClick}>
      <div className={styles.readyBackground}>
        Ready? <span>Start Game</span>
      </div>
    </button>
  );
}

export default ReadyBtn;
