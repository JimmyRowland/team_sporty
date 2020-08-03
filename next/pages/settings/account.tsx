import Layout from "../../components/layouts/settings/Layout";
import React from "react";
import { getAccessToken } from "../../lib/accessToken";
import { useRouter } from "next/router";
import Account from "../../components/AccountPage/Account";

const SettingPage = () => {
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
