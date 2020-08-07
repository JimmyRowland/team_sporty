import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((Theme: Theme) =>
    createStyles({
        memberbody: {
            border: "1px solid #000000",
            borderRadius: "15px",
            height: "100px",
            width: "80%",
            margin: "auto",
            marginTop: "1em",
            textAlign: "center",
        },
        memberelement: {
            float: "left",
            verticalAlign: "middle",
            width: "20%",
            height: "80%",
            marginTop: "8px",
            marginLeft: "1em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        memberelement2: {
            float: "right",
            verticalAlign: "middle",
            width: "20%",
            height: "80%",
            marginTop: "8px",
            marginRight: "1em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        body: {
            borderRadius: "15px",
            width: "60%",
            height: "500px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            margin: "auto",
            padding: "1em",
        },
        mmtext: {
            marginTop: "10px",
        },
        memberscontainer: {
            marginTop: "1em",
            height: "80%",
            margin: "auto",
            overflowY: "scroll",
        },
    }),
);

function MemberTab() {
    const classes = useStyles();
    return (
        <Card className={classes.memberbody}>
            <div className={classes.memberelement}>
                <Avatar />
            </div>
            <div className={classes.memberelement}>
                <Typography variant="h5"> User Name </Typography>
            </div>
            <div className={classes.memberelement2}>
                <Button> Remove </Button>
            </div>
        </Card>
    );
}

export default function TeamInfoManageTab() {
    const classes = useStyles();
    return (
        <Card className={classes.body}>
            <Typography variant="h6" className={classes.mmtext}>
                {" "}
                Member Management{" "}
            </Typography>
            <div className={classes.memberscontainer}>
                <MemberTab />
                <MemberTab />
                <MemberTab />
                <MemberTab />
                <MemberTab />
                <MemberTab />
                <MemberTab />
            </div>
        </Card>
    );
}
