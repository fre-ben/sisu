import "./Button.module.css";
import styles from "./Button.module.css";

function StartGameBtn() {
  return (
    <button className={`${styles.btn} ${styles.menuBtn}`}>Start Game</button>
  );
}

export default StartGameBtn;
