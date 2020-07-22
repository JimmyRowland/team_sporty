import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import React, { useEffect } from "react";
import { avatarPreset, CLOUDINARY_URL } from "../../../lib/cloudinary";
import { useMeQuery, useUploadAvatarMutation } from "../../../generated/graphql";

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
    //TODO move query to parent
    const { data, loading, refetch } = useMeQuery();
    const classes = useStyles();
    const [updateAvatar] = useUploadAvatarMutation();

    const readURL = async (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file) {
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    uploadImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const dropURL = async (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            const file = e.dataTransfer.items[0].getAsFile();
            if (file && file.type.match("image.*")) {
                reader.onloadend = () => {
                    if (typeof reader.result === "string") {
                        uploadImage(reader.result);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const uploadImage = async (base64EncodedImage: any) => {
        const formData = new FormData();
        formData.append("file", base64EncodedImage);
        formData.append("upload_preset", avatarPreset);
        fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.secure_url !== "") {
                    const uploadedFileUrl = data.secure_url;
                    updateAvatar({
                        variables: {
                            url: uploadedFileUrl,
                        },
                    }).then((res) => {
                        refetch();
                    });
                }
            })
            .catch((err) => console.error(err));
    };

    const dragover = (e: any) => {
        e.preventDefault();
    };

    return loading && data && data.me && data.me.avatarUrl ? null : (
        <div className={classes.container}>
            <form>
                <label htmlFor="fileupload" onDrop={(e) => dropURL(e)} onDragOver={(e) => dragover(e)}>
                    <Avatar id="avatar" alt="user" src={data?.me?.avatarUrl} className={classes.avatar} />
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
