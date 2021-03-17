import { ButtonProps } from "./BackBtn";
import "./Button.module.css";
import styles from "./Button.module.css";

function RulesBtn({ onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles.rulesBtn}`} onClick={onClick}>
      How to play
    </button>
  );
}

export default RulesBtn;
