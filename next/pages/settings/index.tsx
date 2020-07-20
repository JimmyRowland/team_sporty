import Layout from "../../components/layouts/settings/Layout";
import React from "react";
import { getAccessToken } from "../../lib/accessToken";
import PersonalPage from "../PersonalPage/App";
import { useRouter } from "next/router";

const SettingPage = () => {
    const router = useRouter();
    const accessToken = getAccessToken();
    if (!accessToken) {
        router.push("/");
    }
    return (
        <Layout title="Settings">
            <PersonalPage />
        </Layout>
    );
};

export default SettingPage;
