import "./Button.module.css";
import styles from "./Button.module.css";
import { JoinBtnProps } from "./types";

function JoinBtn({ onClick, lobbyIsFull }: JoinBtnProps) {
  return (
    <button
      className={`${styles.btn} ${styles.joinBtn}`}
      onClick={onClick}
      disabled={lobbyIsFull}
    >
      <div className={`${styles.btnBackground} ${styles.joinBackground}`}>
        Join
      </div>
    </button>
  );
}

export default JoinBtn;
