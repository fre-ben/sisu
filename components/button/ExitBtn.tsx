import { useRouter } from "next/dist/client/router";
import styles from "./Button.module.css";

function ExitBtn() {
  const router = useRouter();

  const handleClick = () => {
    if (
      confirm(
        "Do you really want to leave the game? (Reconnecting is not possible)"
      )
    ) {
      router.push("/lobbies");
    }
  };

  return (
    <button
      className={`${styles.btn} ${styles.exitBtn} ${styles.backContainer}`}
      onClick={handleClick}
    >
      <img src="/arrow.svg" alt="arrow" />
      Exit
    </button>
  );
}

export default ExitBtn;
