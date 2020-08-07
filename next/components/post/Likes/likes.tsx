import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { IconButton } from "@material-ui/core";
import { useLikePostMutation, UserLikedPostDocument, useUserLikedPostQuery } from "../../../generated/graphql";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((Theme: Theme) =>
    createStyles({
        body: {
            display: "flex",
            float: "left",
            alignItems: "center",
        },
    }),
);

export default function Likes(postID) {
    postID = postID.postID;
    const classes = useStyles();
    const { data, refetch } = useUserLikedPostQuery({ variables: { postID: postID } });
    const [likePost] = useLikePostMutation();
    const handleLikePost = () => {
        likePost({ variables: { postID: postID } }).then(() => {
            refetch(UserLikedPostDocument);
        });
    };

    const LikedIcon = () => {
        if (data?.userLikedPost?.isLiked) return <FavoriteIcon />;
        return <FavoriteBorderIcon />;
    };

    return (
        <div className={classes.body}>
            <IconButton aria-label="like" onClick={handleLikePost}>
                <LikedIcon />
            </IconButton>
            <Typography> {data?.userLikedPost?.likedNum} </Typography>
        </div>
    );
}
