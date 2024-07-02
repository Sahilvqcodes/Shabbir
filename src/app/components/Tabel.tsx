"use client";
import React, { useState } from 'react';
import BookTable from './BookTable';
import AuthorTable from './AuthorTable';
import styles from '../styles/Table.module.scss';

const Table: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'Book' | 'Author'>('Book');

  return (
    <div className={styles.tableContainer}>
      <div className={styles.pillContainer}>
        <button
          className={selectedTab === 'Book' ? styles.active : ''}
          onClick={() => setSelectedTab('Book')}
        >
          Book
        </button>
        <button
          className={selectedTab === 'Author' ? styles.active : ''}
          onClick={() => setSelectedTab('Author')}
        >
          Author
        </button>
      </div>
      {selectedTab === 'Book' ? <BookTable /> : <AuthorTable />}
    </div>
  );
};

export default Table;
