import styles from "./Button.module.css";

function ConfirmBtn() {
  return (
    <button className={`${styles.btn} ${styles.confirmBtn}`} type="submit">
      Confirm
    </button>
  );
}

export default ConfirmBtn;
