import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { commentAsync, PostInterface, selectPosts } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { addPin, removePin } from "./pinnedpostSlice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "100%",
            borderRadius: "15px",
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
            paddingLeft: 10,
        },
        body: {
            paddingLeft: "2em",
            paddingRight: "2em",
            display: "inlined-block",
            overflowWrap: "break-word",
        },
    }),
);

export default function Post({ index, post }: { index: number; post: PostInterface }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const pinPost = () => {
        setAnchorEl(null);
        dispatch(addPin(post));
    };

    const unpinPost = () => {
        setAnchorEl(null);
        dispatch(removePin(post.id));
    };

    const PinMenu = () => {
        if (!post.pin) {
            return (
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={pinPost}>Pin Post</MenuItem>
                </Menu>
            );
        }
        return (
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={unpinPost}>Unpin Post</MenuItem>
            </Menu>
        );
    };
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {post.user.id}
                    </Avatar>
                }
                action={
                    <div>
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <PinMenu />
                    </div>
                }
                title={post.title}
                subheader={post.timeStamp.toString()}
            />
            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p" className={classes.body}>
                    {post.body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon
                        onClick={() => {
                            dispatch(commentAsync(index));
                        }}
                    />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {posts.length > 0
                    ? posts[index].comments.map((comment: string, key: number) => {
                          return (
                              <CardContent key={key}>
                                  <div className={classes.commentContainer}>
                                      <div>
                                          {" "}
                                          <Avatar aria-label="recipe" className={classes.avatar}>
                                              {key}
                                          </Avatar>
                                      </div>
                                      <div className={classes.comment}>
                                          {" "}
                                          <Typography paragraph>{comment}</Typography>
                                      </div>
                                  </div>
                              </CardContent>
                          );
                      })
                    : null}
                <CardContent>
                    <div className={classes.commentContainer}>
                        <div>
                            {" "}
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                R
                            </Avatar>
                        </div>
                        <div className={classes.comment}>
                            {" "}
                            <Typography paragraph>Disqus</Typography>
                        </div>
                    </div>
                </CardContent>
                <CardContent>
                    <div className={classes.commentContainer}>
                        <div>
                            {" "}
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                R
                            </Avatar>
                        </div>
                        <div className={classes.comment}>
                            {" "}
                            <Typography paragraph>Disqus</Typography>
                        </div>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
}
