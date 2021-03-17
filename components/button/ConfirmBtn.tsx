import { ButtonProps } from "./BackBtn";
import "./Button.module.css";
import styles from "./Button.module.css";

function ConfirmBtn({ onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles.confirmBtn}`} onClick={onClick}>
      Confirm
    </button>
  );
}

export default ConfirmBtn;
