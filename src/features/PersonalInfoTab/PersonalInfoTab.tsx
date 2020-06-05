import React from 'react';
import styles from './PersonalInfoTab.module.css'
import EditPopUp from './EditPopUp/EditPopUp';

export default function PersonalInfoTab (props:{ name: string, info: string}) {

    return (
        <div className={styles.Tab}>
            <div className={styles.Cover}></div>
            <div id={styles.TempIcon}/>
            <div className={styles.Pcontainer}>
                <p>
                    <div className={styles.Name}> {props.name} </div>
                </p>
                <p>
                    <div className={styles.Info}> {props.info} </div>
                </p>
            </div>
            <div className={styles.Edit}>
                <EditPopUp />
            </div>
        </div>
    );
}
