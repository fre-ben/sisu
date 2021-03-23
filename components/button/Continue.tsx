import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function ContinueBtn({ onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles.continueBtn}`} onClick={onClick}>
      <div className={`${styles.btnBackground} ${styles.continueBackground}`}>
        Continue
      </div>
    </button>
  );
}

export default ContinueBtn;
