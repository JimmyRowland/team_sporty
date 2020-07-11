import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addPost, addpostAsync } from "./postSlice";

const useStyles = makeStyles({
    root: {
        width: "100%",
        borderRadius: "15px",
    },
    content: {
        height: "70%",
    },
    action: {
        height: "20%",
    },
    title: {
        fontWeight: "bold",
        fontSize: "24px",
    },
    field: {
        display: "block",
        width: "70%",
        height: "100px",
        borderRadius: 15,
        resize: "none",
        margin: "auto",
        padding: "1em",
        marginTop: "1em",
        fontSize: 18,
    },
    send: {
        textAlign: "center",
        display: "flex",
        margin: "auto",
        backgroundColor: "#346DFF",
        color: "white",
        borderRadius: 15,
        width: 100,
        height: 30,
    },
});

export default function PostCreator() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    const handleSend = (e: any) => {
        e.preventDefault();
        dispatch(addpostAsync(comment, "User Name"));
        setComment("");
    };

    const updateField = (e: any) => {
        setComment(e.target.value);
    };

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Typography color="textPrimary" className={classes.title}>
                    New Post
                </Typography>
                <textarea className={classes.field} onChange={(e) => updateField(e)} value={comment} />
            </CardContent>
            <CardActions className={classes.action}>
                <Button className={classes.send} onClick={(e) => handleSend(e)}>
                    {" "}
                    Send{" "}
                </Button>
            </CardActions>
        </Card>
    );
}
