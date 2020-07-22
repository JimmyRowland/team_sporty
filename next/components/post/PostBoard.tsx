import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { postAsync, PostInterface, selectPosts } from "./postSlice";
import PostComponent from "./PostComponent";
import React, { useEffect } from "react";

const useStyles = makeStyles((Theme: Theme) =>
    createStyles({
        messageItem: {
            marginBottom: 100,
        },
    }),
);

export default function PostBoard({ pinned }: { pinned: boolean }) {
    const classes = useStyles();
    const posts = useSelector(selectPosts);
    const reverseposts = posts.slice().reverse();
    return (
        <div>
            {reverseposts.map((post: PostInterface, index) => {
                if (pinned === post.pin) {
                    return (
                        <div key={index} className={classes.messageItem}>
                            <PostComponent post={post} />
                        </div>
                    );
                }
            })}
        </div>
    );
}
