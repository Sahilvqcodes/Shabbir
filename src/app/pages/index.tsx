import React from 'react';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* <Sidebar /> */}
      <div className={styles.content}>
        <h1>Welcome to the CRUD App</h1>
      </div>
    </div>
  );
};

export default Home;
