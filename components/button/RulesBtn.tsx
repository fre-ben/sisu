import "./Button.module.css";
import styles from "./Button.module.css";

function RulesBtn() {
  return (
    <button className={`${styles.btn} ${styles.rulesBtn}`}>How to play</button>
  );
}

export default RulesBtn;
