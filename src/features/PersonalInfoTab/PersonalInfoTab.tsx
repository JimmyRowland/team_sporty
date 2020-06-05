import React from 'react';
import styles from './PersonalInfoTab.module.css';

function PersonalInfoTab({ name, info }: { name: string; info: string }) {
  return (
    <div className={styles.Tab}>
      <div className={styles.Cover} />
      <div id="TempIcon" className={styles.TempIcon} />
      <div className={styles.Pcontainer}>
        <p>
          <div className={styles.Name}> {name} </div>
        </p>
        <p>
          <div className={styles.Info}> {info} </div>
        </p>
      </div>
      <button className={styles.Edit}> Edit</button>
    </div>
  );
}

export default PersonalInfoTab;
