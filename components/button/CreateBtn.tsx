import styles from "./Button.module.css";
import { ButtonProps } from "./types";

function CreateBtn({ onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles.createBtn}`} onClick={onClick}>
      <div className={`${styles.btnBackground} ${styles.createBackground}`}>
        Create Lobby
      </div>
    </button>
  );
}

export default CreateBtn;
