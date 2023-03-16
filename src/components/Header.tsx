import logoImg from "../assets/logo.svg";

import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.containerHeader}>
      <div>
        <img src={logoImg} alt="Logo" />
      </div>
    </header>
  );
};
