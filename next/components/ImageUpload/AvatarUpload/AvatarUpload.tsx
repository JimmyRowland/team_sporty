import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React, {useEffect} from "react";
import {useMeQuery, useUploadAvatarMutation} from "../../../generated/graphql";
import {async} from "q";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
        },
        avatar: {
            width: theme.spacing(15),
            height: theme.spacing(15),
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

export default function AvatarUpload(dragDisabled: boolean) {
    const classes = useStyles();
    const [avatar, setAvatar] = React.useState("");
    const me = useMeQuery();
    const [uploadAvatar] = useUploadAvatarMutation()

    const readURL = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file) {
            reader.onloadend = () => {
                setAvatar(reader.result);
                uploadImage(reader.result);
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
                    uploadImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const uploadImage = async (base64EncodedImage: any) => {
        try{
            console.log(me)
            console.log(typeof me.data.me._id);
            const res = await uploadAvatar({variables:{_id:me.data.me._id, avatarUrl:base64EncodedImage}});
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }

    const dragover = (e: any) => {
        e.preventDefault();
    };
    if(me.loading) return(<div></div>);
    useEffect(() => {
        setAvatar(me.data.me.avatarUrl);
    },[])

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
