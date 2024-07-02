"use client";
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from '../styles/Sidebar.module.scss';

const Sidebar: React.FC = () => {

  const [show, setShow] = useState(false)

  const navigateTo = () => {
    setShow(!show);
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        <li onClick={navigateTo} className='side-menu'>CRUD</li>
        {show && <li>Table</li>}
      </ul>
    </div>
  );
};

export default Sidebar;
