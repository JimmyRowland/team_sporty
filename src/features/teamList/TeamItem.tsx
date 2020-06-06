import React from 'react';
import styles from './TeamItem.module.css';

function TeamItem(props: { name: React.ReactNode }) {
  return (
    <div className={styles.teamItem}>
      <li>
        <span className={styles.dot}></span>&nbsp; {props.name}
      </li>
    </div>
  );
}

export default TeamItem;
