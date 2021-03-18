import "./Button.module.css";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function StartGameBtn({ onClick }: ButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      Start Game
    </button>
  );
}

export default StartGameBtn;
