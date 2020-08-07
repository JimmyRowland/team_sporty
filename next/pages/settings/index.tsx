import Layout from "../../components/layouts/settings/Layout";
import React from "react";
import { getAccessToken } from "../../lib/accessToken";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Account from "../../components/AccountPage/Account";

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
            <Account />
        </Layout>
    );
};

export default SettingPage;
