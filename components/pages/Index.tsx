import RulesBtn from "../button/RulesBtn";
import StartGameBtn from "../button/StartGameBtn";
import Logo from "../logo/Logo";
import "./Index.module.css";
import styles from "./Index.module.css";

function IndexPage() {
  return (
    <div className={styles.container}>
      <Logo size="big" />
      <div className={styles.menuItems}>
        <StartGameBtn />
        <RulesBtn />
      </div>
    </div>
  );
}

export default IndexPage;
