import styles from "./Input.module.css";

type NameInputProps = {
  isMaxLength: boolean;
  playerName: string;
  onHandleChange(event): void;
};

function NameInput({
  isMaxLength,
  playerName,
  onHandleChange,
}: NameInputProps) {
  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Name"
          maxLength={11}
          onChange={(event) => onHandleChange(event)}
          minLength={2}
          required
          value={playerName}
          autoFocus={true}
          autoComplete="off"
          autoCorrect="off"
        />
        {isMaxLength && (
          <p className={styles.status}>Character limit reached!</p>
        )}
      </div>
    </>
  );
}

export default NameInput;
