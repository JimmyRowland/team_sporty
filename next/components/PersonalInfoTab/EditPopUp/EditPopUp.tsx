import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectPersonal, changeintro } from "./EditPersonalInfoSlice";
import AvatarUpload from "../../ImageUpload/AvatarUpload/AvatarUpload";
import { useMeQuery, useUploadIntroMutation } from "../../../generated/graphql";
import BannerUpload from "../../ImageUpload/BannerUpload/BannerUpload";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 800,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: "none",
            borderRadius: 15,
        },
        container: {
            height: "30%",
            width: "100%",
            margin: "auto",
            padding: "2em",
        },
        title: {
            fontWeight: "bold",
            fontSize: 20,
        },
        coverphoto: {
            textAlign: "center",
            margin: "auto",
            marginTop: "1em",
        },
        closecontainer: {
            height: "5%",
        },
        close: {
            position: "absolute",
            right: "1em",
        },
        field: {
            display: "block",
            width: "100%",
            height: "50%",
            borderRadius: 15,
            resize: "none",
            margin: "auto",
            padding: "1em",
            marginTop: "2em",
            fontSize: 18,
        },
        icon: {
            width: "100%",
            height: "100%",
            margin: "auto",
            paddingTop: "2em",
        },
        edit: {
            textAlign: "center",
            display: "flex",
            margin: "auto",
            backgroundColor: "#346DFF",
            color: "white",
            borderRadius: 15,
            width: 100,
            height: 30,
        },
    }),
);

export default function EditPopUp({ info }: { info: string }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [editIntro] = useUploadIntroMutation();
    const [intro, setIntro] = useState("");
    const { refetch } = useMeQuery();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onintroChange = (e: any) => {
        setIntro(e.target.value);
    };

    const handleSubmit = () => {
        handleClose();
        editIntro({ variables: { intro: intro } }).then(() => {
            refetch();
        });
    };
    const body = (
        <Card className={classes.paper}>
            <div className={classes.closecontainer}>
                <IconButton aria-label="close" className={classes.close} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={classes.container}>
                <div>
                    <div className={classes.title}>Profile Picture</div>
                </div>
                <div className={classes.icon}>
                    <AvatarUpload />
                </div>
            </div>
            <div className={classes.container}>
                <div>
                    <div className={classes.title}>Cover Photo</div>
                </div>
                <div className={classes.coverphoto}>
                    <BannerUpload />
                </div>
            </div>
            <div className={classes.container}>
                <div className={classes.title}>Personal Info</div>
                <textarea
                    className={classes.field}
                    placeholder={info}
                    onChange={(e) => {
                        onintroChange(e);
                    }}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                disableElevation
                className={classes.edit}
                onClick={handleSubmit}
            >
                Edit
            </Button>
        </Card>
    );

    return (
        <div>
            <Button variant="contained" color="primary" disableElevation className={classes.edit} onClick={handleOpen}>
                Edit
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
