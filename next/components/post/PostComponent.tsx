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
import { changePinAsync, commentAsync, PostInterface, selectPosts } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {} from "./postSlice";
import { Post, usePinPostMutation } from "../../generated/graphql";
import { first } from "rxjs/operators";

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

export default function PostComponent({
    content,
    firstName,
    lastModifyDate,
    isPinned,
    postID,
    teamID,
    isCoach,
}: {
    content: string;
    firstName: string;
    lastModifyDate: string;
    isPinned: boolean;
    postID: string;
    teamID: string;
    isCoach: boolean;
}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [pinPost] = usePinPostMutation({ variables: { teamID: teamID, isPined: !isPinned, postID: postID } });
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePin = () => {
        setAnchorEl(null);
        pinPost();
    };

    const PinMenu = () => {
        return isCoach ? (
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handlePin}>{isPinned ? "Unpin" : "Pin"}</MenuItem>
            </Menu>
        ) : null;
    };
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {firstName[0]}
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
                subheader={lastModifyDate}
            />
            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p" className={classes.body}>
                    {content}
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
                />
            </CardActions>
        </Card>
    );
}
