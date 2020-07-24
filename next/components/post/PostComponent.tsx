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
import { useSelector, useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {} from "./postSlice";
import { Post, usePinPostMutation } from "../../generated/graphql";
import { first } from "rxjs/operators";
import CloseIcon from "@material-ui/icons/Close";

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
            paddingLeft: 10,
        },
        body: {
            paddingLeft: "2em",
            paddingRight: "2em",
            marginBottom: "2em",
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
    avatarUrl,
    imgUrls,
}: {
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
    const [pinPost] = usePinPostMutation({ variables: { teamID: teamID, isPined: !isPinned, postID: postID } });
    const divref = React.useRef<any>();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(divref.current);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePin = () => {
        setAnchorEl(null);
        pinPost();
    };

    const PinMenu = () => {
        return (
            <div>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handlePin}>{isPinned ? "Unpin" : "Pin"}</MenuItem>
                </Menu>
            </div>
        );
    };

    const PinButton = () => {
        return isCoach ? (
            <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
        ) : null;
    };

    const ImageDisplay = () => {
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

    return (
        <Card className={classes.root}>
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
            </CardContent>
        </Card>
    );
}
