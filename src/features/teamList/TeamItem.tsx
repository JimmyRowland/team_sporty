import React from 'react';
import styles from './TeamItem.module.css';
import { useHistory } from 'react-router-dom';
function TeamItem(props: { name: React.ReactNode }) {
  const history = useHistory();
  const handleRouteChange = (route: string) => {
    history.push(route);
  };
  return (
    <div
      className={styles.teamItem}
      onClick={() => {
        handleRouteChange('/team');
      }}
    >
      <li>
        <span className={styles.dot}></span>&nbsp; {props.name}
      </li>
    </div>
  );
}

export default TeamItem;
