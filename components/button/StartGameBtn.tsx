import { ButtonProps } from "./BackBtn";
import "./Button.module.css";
import styles from "./Button.module.css";

function StartGameBtn({ onClick }: ButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      Start Game
    </button>
  );
}

export default StartGameBtn;
