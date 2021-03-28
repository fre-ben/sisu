import styles from "./Button.module.css";

function BackBtn() {
  return (
    <button
      className={`${styles.btn} ${styles.backBtn} ${styles.backContainer}`}
    >
      <img src="/arrow.svg" alt="arrow" />
      Back
    </button>
  );
}

export default BackBtn;
