import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function KeepBtn({ onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles.keepBtn}`} onClick={onClick}>
      <div className={styles.keepDiscardBackground}>Keep</div>
    </button>
  );
}

export default KeepBtn;
