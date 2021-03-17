import "./Button.module.css";
import styles from "./Button.module.css";

function ConfirmBtn() {
  return (
    <button className={`${styles.btn} ${styles.confirmBtn}`}>Confirm</button>
  );
}

export default ConfirmBtn;
