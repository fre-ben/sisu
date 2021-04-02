import styles from "./MiscElements.module.css";
import type { StatusbarProps } from "./types";

function Statusbar({ statusMessage }: StatusbarProps) {
  return (
    <>
      <p className={styles.statusbar}>
        {" "}
        <img src="/arrow_right.svg" alt="arrow" />
        {statusMessage}
      </p>
    </>
  );
}

export default Statusbar;
