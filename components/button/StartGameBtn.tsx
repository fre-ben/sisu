import styles from "./Button.module.css";

function StartGameBtn() {
  return (
    <button className={`${styles.btn} ${styles.startBtn}`}>Start Game</button>
  );
}

export default StartGameBtn;
