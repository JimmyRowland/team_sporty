import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
    GetPostsDocument,
    useAddPostCommentMutation,
    useDeletePostMutation,
    useGetCommentsQuery,
    usePinPostMutation,
} from "../../generated/graphql";
import RoomIcon from "@material-ui/icons/Room";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Collapse } from "@material-ui/core";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Likes from "./Likes/likes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "100%",
            borderRadius: "15px",
            marginBottom: 20,
        },
        media: {
            height: 0,
            paddingTop: "56.25%", // 16:9
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: "rotate(180deg)",
        },
        commentContainer: {
            display: "flex",
            flexDirection: "row",
        },
        comment: {
            width: "100%",
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        body: {
            paddingLeft: "2em",
            paddingRight: "2em",
            marginBottom: "1em",
            display: "inlined-block",
            overflowWrap: "break-word",
        },
        imageCard: {
            display: "block",
            width: "30%",
            margin: "1em",
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
        pin: {
            paddingLeft: theme.spacing(2),
            paddingTop: theme.spacing(1.3),
            display: "flex",
        },
        pinElement: {
            paddingTop: 5,
            paddingLeft: 2,
        },
        commentField: {
            width: "80%",
        },
        commentButton: {
            width: "10%",
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
        commentDisplay: {
            marginTop: theme.spacing(2),
        },
        commentInput: {
            display: "flex",
            justifyContent: "center",
        },
        buttonleft: {
            float: "left",
            marginLeft: theme.spacing(1),
        },
        buttonRight: {
            textAlign: "right",
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1),
        },
        pinTest: {
            display: "flex",
            //flexWrap: "wrap",
        },
    }),
);

const PinMenu = ({
    anchorEl,
    handlePin,
    isPinned,
    handleClose,
    handleDelete,
}: {
    anchorEl: any;
    handlePin: any;
    isPinned: boolean;
    handleClose: any;
    handleDelete: any;
}) => {
    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={handlePin}>{isPinned ? "Unpin" : "Pin"}</MenuItem>
                <MenuItem onClick={handleDelete}>{"Delete"}</MenuItem>
            </Menu>
        </div>
    );
};

const PinButton = ({ isCoach, handleClick }: { isCoach: boolean; handleClick: (event: any) => void }) => {
    return isCoach ? (
        <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
        </IconButton>
    ) : null;
};

const CommentComponent = ({ comment, classes }: { comment: any; classes: any }) => {
    return (
        <Card className={classes.commentDisplay} variant="outlined">
            <CardHeader
                avatar={<Avatar src={comment.user.avatarUrl} />}
                title={<Typography>{comment.user.name}</Typography>}
            />
            <Typography className={classes.body}>{comment.content}</Typography>
        </Card>
    );
};

const ImageDisplay = ({ imgUrls, classes }: { imgUrls: string[]; classes: any }) => {
    return imgUrls ? (
        <div className={classes.imageDisplayContainer}>
            {imgUrls.map((image, index) => (
                <Card className={classes.imageCard} key={index}>
                    <CardMedia
                        component="img"
                        alt="UploadedPhoto"
                        image={image}
                        title="UploadedPhoto"
                        className={classes.image}
                    />
                </Card>
            ))}
        </div>
    ) : null;
};

const PinDisplay = ({ isPinned, classes }: { isPinned: boolean; classes: any }) => {
    return isPinned ? (
        <div className={classes.pin}>
            <RoomIcon />
        </div>
    ) : null;
};

export default function PostComponent({
    content,
    firstName,
    lastModifyDate,
    isPinned,
    postID,
    teamID,
    isCoach,
    avatarUrl,
    imgUrls,
    index,
}: {
    index: number;
    content: string;
    firstName: string;
    lastModifyDate: string;
    isPinned: boolean;
    postID: string;
    teamID: string;
    isCoach: boolean;
    avatarUrl: string;
    imgUrls: string[];
}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [pinPost] = usePinPostMutation();
    const [deletePost] = useDeletePostMutation();
    const divref = React.useRef<any>();
    const [expanded, setExpanded] = useState(false);
    const [addComment] = useAddPostCommentMutation();
    const [commentInput, setCommentInput] = React.useState("");
    const { startPolling, stopPolling, data: commentQuery } = useGetCommentsQuery({
        variables: { postID: postID, teamID: teamID },
        skip: !expanded,
        pollInterval: 20000,
    });
    const handleExpandClick = () => {
        setExpanded((expended) => {
            if (!expanded) {
                startPolling(2000);
            } else {
                stopPolling();
            }
            return !expended;
        });
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(divref.current);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePin = () => {
        setAnchorEl(null);
        const limit = (Math.floor(index / 10) + 1) * 10;
        pinPost({
            variables: { teamID: teamID, isPined: !isPinned, postID: postID },
            update: (proxy, { data: { pinPost } }) => {
                const data: any = proxy.readQuery({
                    query: GetPostsDocument,
                    variables: { teamID: teamID, limit: limit, skip: limit - 10 },
                });
                data.getPosts[index].isPined = !isPinned;
                proxy.writeQuery({
                    query: GetPostsDocument,
                    variables: { teamID: teamID, limit: limit, skip: limit - 10 },
                    data: { ...data },
                });
            },
        });
    };

    const handleDelete = () => {
        setAnchorEl(null);
        const limit = (Math.floor(index / 10) + 1) * 10;
        deletePost({
            variables: { teamID: teamID, postID: postID },
            optimisticResponse: { deletePost: true },
            update: (proxy, { data: { deletePost } }) => {
                const data: any = proxy.readQuery({
                    query: GetPostsDocument,
                    variables: { teamID: teamID, limit: limit, skip: limit - 10 },
                });
                data.getPosts.splice(index, 1);
                proxy.writeQuery({
                    query: GetPostsDocument,
                    variables: { teamID: teamID, limit: limit, skip: limit - 10 },
                    data: { ...data },
                });
            },
        });
    };

    const handleComment = () => {
        addComment({ variables: { teamID: teamID, content: commentInput, postID: postID } }).then(() => {
            setCommentInput("");
        });
    };

    const onCommentChange = (e) => {
        setCommentInput(e.target.value);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar aria-label="user" src={avatarUrl} />}
                title={<Typography> {firstName} </Typography>}
                action={
                    <div ref={divref} className={classes.pinTest}>
                        <PinDisplay isPinned={isPinned} classes={classes} />
                        <PinButton isCoach={isCoach} handleClick={handleClick} />
                        <PinMenu
                            isPinned={isPinned}
                            anchorEl={anchorEl}
                            handlePin={handlePin}
                            handleClose={handleClose}
                            handleDelete={handleDelete}
                        />
                    </div>
                }
                subheader={new Date(lastModifyDate).toString()}
            />
            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p" className={classes.body}>
                    {content}
                </Typography>
                <ImageDisplay classes={classes} imgUrls={imgUrls} />
                <div className={classes.buttonRight}>
                    <Likes postID={postID} />
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.comment}>
                    <div className={classes.commentInput}>
                        <TextField
                            onChange={(e) => onCommentChange(e)}
                            variant="outlined"
                            placeholder="Comment something"
                            fullWidth
                            className={classes.commentField}
                            value={commentInput}
                        />
                        <Button onClick={handleComment} className={classes.commentButton}>
                            Send
                        </Button>
                    </div>
                    <div>
                        {commentQuery?.getComments?.map((comment, index) => {
                            return <CommentComponent comment={comment} classes={classes} key={index} />;
                        })}
                    </div>
                    <div className={classes.buttonRight}>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
}
