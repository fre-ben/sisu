import "./Button.module.css";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function ConfirmBtn({ onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles.confirmBtn}`}
      onClick={onClick}
      type="submit"
    >
      Confirm
    </button>
  );
}

export default ConfirmBtn;
