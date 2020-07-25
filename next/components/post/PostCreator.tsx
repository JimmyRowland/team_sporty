import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useAddPostMutation } from "../../generated/graphql";
import CardMedia from "@material-ui/core/CardMedia";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { CloudinaryImageUpload } from "../../lib/cloudinary";

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
        float: "right",
        marginRight: "1em",
    },
    title: {
        fontWeight: "bold",
        fontSize: "24px",
    },
    field: {
        display: "block",
        width: "80%",
        height: "150px",
        borderRadius: 15,
        resize: "none",
        margin: "auto",
        padding: "1em",
        marginTop: "1em",
        fontSize: 18,
    },
    imageDrop: {
        display: "none",
    },
    send: {
        textAlign: "center",
        display: "flex",
        margin: "auto",
        borderRadius: 15,
        width: 100,
        height: 30,
    },
    imageCard: {
        display: "block",
        width: "30%",
        margin: "1em",
    },
    imageDelete: {
        width: "10px",
        height: "10px",
        float: "right",
    },
    image: {
        height: "100%",
    },
    imageDisplayContainer: {
        width: "100%",
        marginTop: "1em",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
    },
});

export default function PostCreator({ teamID }: { teamID: string }) {
    const classes = useStyles();
    const [content, setContent] = useState("");
    const [images, setImages] = useState<{ id: string; url: string }>([]);
    const [submitPost] = useAddPostMutation();
    const [id, setid] = useState(0);
    const handleSubmit = () => {
        uploadContent().then(() => {
            setContent("");
            setImages([]);
        });
    };

    const redirectButton = () => {
        document.getElementById("postimage").click();
    };
    const readURL = async (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file) {
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setImages([...images, { id: id, url: reader.result }]);
                    setid(id + 1);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadContent = async () => {
        const promises: Promise<any>[] = [];
        images.map((image) => {
            const promise = CloudinaryImageUpload(image.url);
            promises.push(promise);
        });
        Promise.all(promises)
            .then((res) => {
                const imgUrls: string[] = [];
                res.map((img) => {
                    imgUrls.push(img.secure_url.toString());
                });
                submitPost({ variables: { teamID: teamID, content: content, imgUrls: imgUrls } });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const OnRemoveImage = (id: string) => {
        setImages(
            images.filter((image) => {
                return image.id !== id;
            }),
        );
    };

    const ImageDisplay = () => {
        return (
            <div className={classes.imageDisplayContainer}>
                {images.map((image) => (
                    <Card className={classes.imageCard} key={image.id}>
                        <IconButton className={classes.imageDelete} onClick={(e) => OnRemoveImage(image.id)}>
                            <CloseIcon />
                        </IconButton>
                        <CardMedia
                            component="img"
                            alt="UploadedPhoto"
                            image={image.url}
                            title="UploadedPhoto"
                            className={classes.image}
                        />
                    </Card>
                ))}
            </div>
        );
    };
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Typography color="textPrimary" className={classes.title}>
                    New Post
                </Typography>
                <textarea className={classes.field} onChange={(e) => setContent(e.target.value)} value={content} />
                <div>
                    <ImageDisplay />
                </div>
            </CardContent>
            <CardActions className={classes.action}>
                <form>
                    <label htmlFor="postimage">
                        <IconButton onClick={(e) => redirectButton()}>
                            <InsertPhotoIcon />
                        </IconButton>
                    </label>

                    <input
                        id="postimage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => readURL(e)}
                        className={classes.imageDrop}
                    />
                </form>
                <div>
                    <Button  color="secondary" variant="contained" className={classes.send} onClick={handleSubmit}>
                        {" "}
                        Send{" "}
                    </Button>
                </div>
            </CardActions>
        </Card>
    );
}
