import "./Button.module.css";
import styles from "./Button.module.css";

function BackBtn() {
  return (
    <button className={`${styles.btn} ${styles.backBtn}`}>
      <div className={styles.backContainer}>
        <img src="arrow.svg" alt="arrow" />
        Back
      </div>
    </button>
  );
}

export default BackBtn;
