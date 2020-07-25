import Layout from "../../components/layouts/settings/Layout";
import React from "react";
import { getAccessToken } from "../../lib/accessToken";
import { useRouter } from "next/router";

const SettingPage = () => {
    const router = useRouter();
    const accessToken = getAccessToken();
    if (!accessToken) {
        router.push("/");
    }
    return <Layout>{null}</Layout>;
};

export default SettingPage;
