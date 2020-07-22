import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import { useMeQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "fit-content",
    },
    avatar: {
        width: 100,
        height: 100,
    },
    name: {
        marginTop: theme.spacing(1),
    },
}));

const Profile = () => {
    const classes = useStyles();
    const { data, loading } = useMeQuery();
    if (!loading && data && data.me) {
        return (
            <div className={clsx(classes.root)}>
                <Avatar alt="Person" className={classes.avatar} src={data.me.avatarUrl} />
                <Typography className={classes.name} variant="h5">
                    {data.me.name}
                </Typography>
            </div>
        );
    } else {
        return null;
    }
};

export default Profile;
