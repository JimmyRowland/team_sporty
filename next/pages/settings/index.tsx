import Layout from "../../components/layouts/settings/Layout";
import React from "react";
import { getAccessToken } from "../../lib/accessToken";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import classes from "*.module.css";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    container: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "40px auto 0 auto",
        maxWidth: 1000,
        paddingRight: "13%",
    },
});

const SettingPage = () => {
    const classes = useStyles();
    const router = useRouter();
    const accessToken = getAccessToken();
    if (!accessToken) {
        router.push("/");
    }
    return (
        <Layout>
            <div className={classes.container}>
                <Typography align="center" variant="h6">
                    On the settings panel to your left, you can manage your account and teams here. If you would like to
                    leave your team, click on the members list of your team.
                </Typography>
            </div>
        </Layout>
    );
};

export default SettingPage;
