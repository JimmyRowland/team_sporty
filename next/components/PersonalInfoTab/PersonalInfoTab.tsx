import React from "react";
import styles from "./PersonalInfoTab.module.css";
import EditPopUp from "./EditPopUp/EditPopUp";
import { useSelector } from "react-redux";
import { selectPersonal } from "./EditPopUp/EditPersonalInfoSlice";
import {useMeQuery} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Avatar} from "@material-ui/core";
import AvatarUpload from "../ImageUpload/AvatarUpload/AvatarUpload";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar:{
            margin:"auto",
            width: theme.spacing(15),
            height: theme.spacing(15),
            marginTop:"1em",
        }
    }),
);
export default function PersonalInfoTab(){
    const info = useSelector(selectPersonal);
    const me = useMeQuery();
    const classes = useStyles();
    console.log(me);
    if(!me.loading){
        return (
            <div className={styles.Tab}>
                <div className={styles.Cover} />
                <Avatar src={me.data.me.avatarUrl} className={classes.avatar}/>
                <div className={styles.Pcontainer}>
                    <p>
                        <div className={styles.Name}> {me.data.me.name} </div>
                    </p>
                    <p>
                        <div className={styles.Info}> {info.intro} </div>
                    </p>
                </div>
                <div className={styles.Edit}>
                    <EditPopUp />
                </div>
            </div>
        )
    }
    else{
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
        )
    }
}
