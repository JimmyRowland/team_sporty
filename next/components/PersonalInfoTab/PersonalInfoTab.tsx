import React from "react";
import EditPopUp from "./EditPopUp/EditPopUp";
import { useSelector } from "react-redux";
import { selectPersonal } from "./EditPopUp/EditPersonalInfoSlice";
import { useMeQuery } from "../../generated/graphql";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import AvatarUpload from "../ImageUpload/AvatarUpload/AvatarUpload";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            position: "relative",
            width: "90%",
            height: "40%",
            minWidth: "400px",
            minHeight: "300px",
            maxWidth: "1000px",
            maxHeight: "700px",
            margin: "50px auto",
            padding: theme.spacing(2),
            borderRadius: "15px",
        },
        avatar: {
            margin: "auto",
            width: theme.spacing(15),
            height: theme.spacing(15),
            marginTop: "-3em",
        },
        text: {
            marginTop: theme.spacing(1),
            textAlign: "center",
        },
        text2: {
            marginTop: theme.spacing(1),
            textAlign: "center",
            fontWeight: "lighter",
        },
        textContainer: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
    }),
);

//top tab on profile page
export default function PersonalInfoTab() {
    const info = useSelector(selectPersonal);
    const { data, loading, refetch } = useMeQuery();
    const classes = useStyles();
    return loading && data && data.me ? null : (
        <Card className={classes.body}>
            <CardMedia component="img" alt="CoverPhoto" height="200" image={data?.me?.bannerUrls} title="CoverPhoto" />
            <Avatar src={data?.me?.avatarUrl} className={classes.avatar} />
            <div className={classes.textContainer}>
                <Typography variant={"h4"} className={classes.text}>
                    {" "}
                    {data?.me?.name}{" "}
                </Typography>
                <Typography variant={"subtitle1"} className={classes.text2}>
                    {" "}
                    {data?.me?.introduction}{" "}
                </Typography>
            </div>
            <div>
                <EditPopUp info={data?.me?.introduction} />
            </div>
        </Card>
    );
}
