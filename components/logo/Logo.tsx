import "./Logo.module.css";
import styles from "./Logo.module.css";

type LogoProps = {
  size: string;
};

function Logo({ size }: LogoProps) {
  return <div className={`${styles.logo} ${styles[size]}`}>Sisu</div>;
}

export default Logo;
