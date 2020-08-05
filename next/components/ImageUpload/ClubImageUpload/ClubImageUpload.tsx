import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import React, { useEffect } from "react";
import { cloudinary, CloudinaryImageUpload } from "../../../lib/cloudinary";
import {
    useGetTeamPageStaticQuery,
    useMeQuery,
    useUploadAvatarMutation,
    useUploadTeamImageMutation,
} from "../../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {},
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

export default function ClubImageUpload(team) {
    const teamID = team.teamID;
    const imgUrl = team.imgUrl;
    const classes = useStyles();
    const [updateTeamImage] = useUploadTeamImageMutation();
    const {data, refetch } = useGetTeamPageStaticQuery({
        variables: {
            teamID: teamID,
        },
    });

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

    const uploadImage = async (base64EncodedImage: any) => {
        CloudinaryImageUpload(base64EncodedImage)
            .then((data: any) => {
                const uploadedFileUrl = data.secure_url;
                updateTeamImage({
                    variables: {
                        url: uploadedFileUrl,
                        teamID: teamID,
                    },
                }).then((res) => {
                    refetch();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const dragover = (e: any) => {
        e.preventDefault();
    };

    return (
        <div className={classes.container}>
            <form>
                <label htmlFor="fileupload" onDragOver={(e) => dragover(e)}>
                    <Avatar id="avatar" alt="user" src={imgUrl} className={classes.avatar} />
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
