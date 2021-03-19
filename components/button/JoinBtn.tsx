import "./Button.module.css";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function JoinBtn({ onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles.joinBtn}`} onClick={onClick}>
      <div className={styles.joinBackground}>Join</div>
    </button>
  );
}

export default JoinBtn;
