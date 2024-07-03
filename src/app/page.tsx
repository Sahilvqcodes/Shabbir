import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar";
import Table from "./components/Tabel";
export default function Home() {
  return (
    <div className={styles.container}>
    <Sidebar />
  </div>
  );
}
