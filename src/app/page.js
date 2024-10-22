import Phones from "@/Components/Phones";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Phones</h1>
      <Phones />
    </div>
  );
}
