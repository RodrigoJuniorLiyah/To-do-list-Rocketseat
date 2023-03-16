import { useState } from "react";
import { Content } from "./components/Content";
import { Header } from "./components/Header";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Header />

      <main>
        <Content />
      </main>
    </div>
  );
}

export default App;
