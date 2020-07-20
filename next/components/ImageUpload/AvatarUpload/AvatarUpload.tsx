import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "100%",
            height: "100%",
            margin: "auto",
            marginTop: "1em",
        },
        avatar: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            margin: "auto",
            "&:hover": {
                opacity: "0.5",
            },
        },
        imageDrop: {
            display: "none",
        },
    }),
);

export default function AvatarUpload() {
    const classes = useStyles();
    const [avatar, setAvatar] = React.useState("");

    const readURL = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file) {
            reader.onloadend = () => {
                setAvatar(reader.result);
                // Upload here
            };
            reader.readAsDataURL(file);
        }
    };

    const dropURL = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            const file = e.dataTransfer.items[0].getAsFile();
            if (file && file.type.match("image.*")) {
                reader.onloadend = () => {
                    setAvatar(reader.result);
                    // Upload here
                    uploadImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const uploadImage = (base64EncodedImage: any) => {
        console.log(base64EncodedImage);
    }

    const dragover = (e: any) => {
        e.preventDefault();
    };

    return (
        <div className={classes.container}>
            <form>
                <label htmlFor="fileupload" onDrop={(e) => dropURL(e)} onDragOver={(e) => dragover(e)}>
                    <Avatar id="avatar" alt="user" src={avatar} className={classes.avatar} />
                </label>
                <input
                    id="fileupload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => readURL(e)}
                    className={classes.imageDrop}
                />
            </form>
        </div>
    );
}
