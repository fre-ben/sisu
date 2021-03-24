import styles from "./MiscElements.module.css";
import { RoundCounterProps } from "./types";

function RoundCounter({ roundNr }: RoundCounterProps) {
  return (
    <>
      <p className={styles.roundCounter}>
        Round: <span>{roundNr}</span>
      </p>
    </>
  );
}

export default RoundCounter;
