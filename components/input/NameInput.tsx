import { useState } from "react";
import "./Input.module.css";
import styles from "./Input.module.css";

function NameInput() {
  const [nameStatus, setNameStatus] = useState("");

  const checkValueLength = (event) => {
    const valueLength = event.target.value.length;
    if (valueLength >= 11) {
      setNameStatus("Character limit reached!");
    } else {
      setNameStatus("");
    }
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
        <p className={styles.status}>{nameStatus}</p>
      </div>
    </>
  );
}

export default NameInput;
