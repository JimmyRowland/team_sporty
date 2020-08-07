import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((Theme: Theme) =>
    createStyles({
        body: {
            borderRadius: "15px",
            width: "60%",
            height: "40%",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            margin: "auto",
            padding: "1em",
        },
        container: {
            display: "block",
            width: "80%",
            margin: "auto",
            textAlign: "center",
        },
        buttoncontainer: {
            display: "block",
            width: "80%",
            margin: "auto",
            textAlign: "center",
            padding: "1em",
        },
        avatar: {
            height: "100px",
            width: "100px",
            margin: "auto",
        },
        description: {
            textAlign: "left",
        },
        field: {
            width: "100%",
            borderRadius: 15,
            resize: "none",
            margin: "auto",
            padding: "1em",
            fontSize: 18,
        },
        button: {
            margin: "auto",
            backgroundColor: "#346DFF",
            color: "white",
            borderRadius: 15,
            width: 100,
            height: 30,
        },
    }),
);

export default function TeamInfoManageTab() {
    const classes = useStyles();
    return (
        <Card className={classes.body}>
            <div className={classes.container}>
                <Avatar className={classes.avatar}>T</Avatar>
            </div>
            <div className={classes.container}>
                <Typography variant="h3"> Club name </Typography>
                <Typography variant="h5"> Team name </Typography>
            </div>
            <div className={classes.container}>
                <Typography variant="h6" className={classes.description}>
                    {" "}
                    Introduction:{" "}
                </Typography>
                <textarea placeholder={"Edit introduction"} className={classes.field} />
            </div>
            <div className={classes.buttoncontainer}>
                <Button variant="contained" color="primary" disableElevation className={classes.button}>
                    {" "}
                    Edit{" "}
                </Button>
            </div>
        </Card>
    );
}
