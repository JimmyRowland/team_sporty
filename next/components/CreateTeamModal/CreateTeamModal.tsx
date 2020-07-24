import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: "none",
            borderRadius: 15,
        },
        allcontainer: {
            marginTop: "3em",
        },
        container: {
            height: "20%",
            width: "100%",
            margin: "auto",
            padding: "1em",
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
            fontSize: 16,
        },
        icon: {
            textAlign: "center",
            height: 100,
            width: 100,
            borderRadius: "50%",
            backgroundColor: "#C4C4C4",
            margin: "auto",
            marginTop: "1em",
        },
        edit: {
            marginTop: "1em",
            textAlign: "center",
            display: "flex",
            margin: "auto",
            backgroundColor: "#346DFF",
            color: "white",
            borderRadius: 15,
            width: 200,
            height: 30,
        },
        buttoncontainer: {
            marginBottom: "5px",
        },
    }),
);

export default function CreateTeamModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onintroChange = (e: any) => {};

    const handleSubmit = () => {
        handleClose();
    };
    const body = (
        <div className={classes.paper}>
            <div className={classes.closecontainer}>
                <IconButton aria-label="close" className={classes.close} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Typography variant={"h6"}> Create Team </Typography>
            <div className={classes.allcontainer}>
                <div className={classes.container}>
                    <input
                        className={classes.field}
                        placeholder={"Club name"}
                        onChange={(e) => {
                            onintroChange(e);
                        }}
                    />
                </div>
                <div className={classes.container}>
                    <input
                        className={classes.field}
                        placeholder={"Team name"}
                        onChange={(e) => {
                            onintroChange(e);
                        }}
                    />
                </div>
                <div className={classes.container}>
                    <input
                        className={classes.field}
                        placeholder={"Type of sport"}
                        onChange={(e) => {
                            onintroChange(e);
                        }}
                    />
                </div>
            </div>
            <div className={classes.buttoncontainer}>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    className={classes.edit}
                    onClick={handleSubmit}
                >
                    Create New Team
                </Button>
            </div>
        </div>
    );

    return (
        <div>
            <Button variant="contained" color="primary" disableElevation className={classes.edit} onClick={handleOpen}>
                Create New Team
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
