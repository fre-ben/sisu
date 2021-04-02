import styles from "./Button.module.css";
import { JoinBtnProps } from "./types";

function JoinBtn({ onClick, lobbyIsFull, hasStarted }: JoinBtnProps) {
  return (
    <button
      className={`${styles.btn} ${styles.joinBtn}`}
      onClick={onClick}
      disabled={lobbyIsFull || hasStarted}
    >
      <div className={`${styles.btnBackground} ${styles.joinBackground}`}>
        Join
      </div>
    </button>
  );
}

export default JoinBtn;
