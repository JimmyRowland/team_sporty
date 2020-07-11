import React from "react";
import styles from "./PersonalInfoTab.module.css";
import EditPopUp from "./EditPopUp/EditPopUp";
import { useSelector } from "react-redux";
import { selectPersonal } from "./EditPopUp/EditPersonalInfoSlice";

export default function PersonalInfoTab() {
    const info = useSelector(selectPersonal);
    return (
        <div className={styles.Tab}>
            <div className={styles.Cover} />
            <div id={styles.TempIcon} />
            <div className={styles.Pcontainer}>
                <p>
                    <div className={styles.Name}> {info.name} </div>
                </p>
                <p>
                    <div className={styles.Info}> {info.intro} </div>
                </p>
            </div>
            <div className={styles.Edit}>
                <EditPopUp />
            </div>
        </div>
    );
}
