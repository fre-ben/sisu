import "./Button.module.css";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function RulesBtn({ onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles.rulesBtn}`} onClick={onClick}>
      How to play
    </button>
  );
}

export default RulesBtn;
