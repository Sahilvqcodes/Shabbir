"use client";
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from '../styles/Sidebar.module.scss';
import Table from './Tabel';

const Sidebar: React.FC = () => {

  const [show, setShow] = useState(false)
  const [showTable, setShowTable] = useState(false)
  console.log("showtable>>>", showTable)

  const navigateTo = () => {
    setShow(!show);
    setShowTable(false)
  };

  const handleShowTable = () => {
    setShow(true);
    setShowTable(true)
  }

  return (
    <>
      <div className={styles.side_container}>
        <div className={styles.sidebar}>
          <div className={styles.logo_box}>Logo</div>
          <div className={styles.menu_links}>
            <h3>GENERAL</h3>
            <div className={styles.menu_links_inner}>
              <ul>
                <li onClick={navigateTo} className={show ? styles.active_menu : ""}>
                  <div className={styles.menu_link}>Crud<svg fill="#fff" height="16px" width="16px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330" xmlSpace="preserve">
                    <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                  </svg></div>
                </li>
                <ul className={styles.submenu}>
                  {show && <li className={styles.active_table} onClick={handleShowTable}>Table</li>}
                </ul>
              </ul>
            </div>
          </div>
        </div>
        {showTable &&
          <div className={styles.right_content}>
            <div className={styles.right_container}>
              <Table />
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default Sidebar;
