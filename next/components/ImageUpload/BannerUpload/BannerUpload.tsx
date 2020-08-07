import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CloudinaryImageUpload } from "../../../lib/cloudinary";
import { useMeQuery, useUploadBannerMutation } from "../../../generated/graphql";
import { CardMedia } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: "100%",
            width: "100%",
        },
        covercontainer: {
            display: "block",
            overflow: "hidden",
            width: "400px",
            height: "150px",
            borderRadius: 15,
            margin: "auto",
            marginTop: "1em",
            "&:hover": {
                opacity: "0.5",
            },
        },
        cover: {
            display: "block",
            maxWidth: "100%",
            verticalAlign: "middle",
            horizontalAlign: "middle",
        },
        imageDrop: {
            display: "none",
        },
    }),
);

export default function BannerUpload() {
    const classes = useStyles();
    const [updateBanner] = useUploadBannerMutation();
    const { data, loading, refetch } = useMeQuery();
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
        CloudinaryImageUpload(base64EncodedImage)
            .then((data: any) => {
                const uploadedFileUrl = data.secure_url;
                updateBanner({
                    variables: {
                        url: uploadedFileUrl,
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
    return loading && data && data.me && data.me.bannerUrls ? null : (
        <div className={classes.container}>
            <form>
                <label htmlFor="bannerupload" onDrop={(e) => dropURL(e)} onDragOver={(e) => dragover(e)}>
                    <div className={classes.covercontainer}>
                        <CardMedia
                            component="img"
                            alt="Upload banner"
                            height="150"
                            image={data?.me?.bannerUrls}
                            className={classes.cover}
                        />
                    </div>
                </label>

                <input
                    id="bannerupload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => readURL(e)}
                    className={classes.imageDrop}
                />
            </form>
        </div>
    );
}
