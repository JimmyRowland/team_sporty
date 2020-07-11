import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { postAsync, PostInterface, selectPosts } from "./postSlice";
import Post from "./Post";
import React, { useEffect } from "react";

const useStyles = makeStyles((Theme: Theme) =>
    createStyles({
        messageItem: {
            marginBottom: 20,
        },
    }),
);

export default function MessageBoard({ pinned }: { pinned: boolean }) {
    const classes = useStyles();
    const posts = useSelector(selectPosts);
    const reverseposts = posts.slice().reverse();
    return (
        <div>
            {reverseposts.map((post: PostInterface) => {
                if (pinned === post.pin) {
                    return (
                        <div key={post.id} className={classes.messageItem}>
                            <Post index={post.id} post={post} />
                        </div>
                    );
                }
            })}
        </div>
    );
}
