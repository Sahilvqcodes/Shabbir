import React from 'react';
import Sidebar from '../components/Sidebar';
import Table from '../components/Tabel';
import styles from '../styles/Home.module.scss';

const TablePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
};

export default TablePage;
