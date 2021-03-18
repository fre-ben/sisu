import { useState } from "react";
import "./Input.module.css";
import styles from "./Input.module.css";

function NameInput() {
  const [isMaxLength, setIsMaxLength] = useState(false);

  const checkValueLength = (event) => {
    setIsMaxLength(event.target.value.length >= 11);
  };

  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Name"
          maxLength={11}
          onChange={(event) => checkValueLength(event)}
        />
        {isMaxLength && (
          <p className={styles.status}>Character limit reached!</p>
        )}
      </div>
    </>
  );
}

export default NameInput;
