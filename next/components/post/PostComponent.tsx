import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
    GetPostsDocument,
    usePinPostMutation,
    useAddPostCommentMutation,
    useUserLikedPostQuery,
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
        avatar: {
            backgroundColor: red[500],
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
            paddingTop: theme.spacing(2),
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
    }),
);

const PinMenu = ({ anchorEl, handlePin, isPinned }: { anchorEl: any; handlePin: any; isPinned: boolean }) => {
    return (
        <div>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handlePin}>{isPinned ? "Unpin" : "Pin"}</MenuItem>
            </Menu>
        </div>
    );
};

const PinButton = ({ isCoach, handleClick }: { isCoach: boolean; handleClick: any }) => {
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
            <Typography className={classes.pinElement}> This post is pinned </Typography>
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
    comments,
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
    comments: any;
}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [pinPost] = usePinPostMutation();
    const divref = React.useRef<any>();
    const [expanded, setExpanded] = React.useState(false);
    const [addComment] = useAddPostCommentMutation();
    const { data, refetch } = useUserLikedPostQuery({ variables: { postID: postID } });

    const [commentInput, setCommentInput] = React.useState("");

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(divref.current);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePin = () => {
        setAnchorEl(null);
        pinPost({
            variables: { teamID: teamID, isPined: !isPinned, postID: postID },
            optimisticResponse: { pinPost: true },
            update: (proxy, { data: { pinPost } }) => {
                const data: any = proxy.readQuery({
                    query: GetPostsDocument,
                    variables: { teamID: teamID, limit: 10, skip: 0 },
                });
                data.getPosts[index].isPined = !isPinned;
                proxy.writeQuery({
                    query: GetPostsDocument,
                    variables: { teamID: teamID, limit: 10, skip: 0 },
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
            <PinDisplay />
            <CardHeader
                avatar={<Avatar aria-label="recipe" className={classes.avatar} src={avatarUrl} />}
                title={<Typography> {firstName} </Typography>}
                action={
                    <div ref={divref}>
                        <PinButton />
                        <PinMenu />
                    </div>
                }
                subheader={lastModifyDate}
            />
            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p" className={classes.body}>
                    {content}
                </Typography>
                <ImageDisplay />
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
                        {comments?.map((comment) => {
                            return <CommentComponent comment={comment} />;
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
