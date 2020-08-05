import Layout from "../../../components/layouts/settings/Layout";
import React from "react";
import { getAccessToken } from "../../../lib/accessToken";
import { useRouter } from "next/router";
import Team from "../../../components/TeamEditPage/Team";
import { TeamNotFound } from "../../../components/Error/TeamNotFound";

const SettingPage = () => {
    const router = useRouter();
    const accessToken = getAccessToken();
    const { tid } = router.query;
    if (!accessToken) {
        router.push("/");
    }
    if (typeof tid !== "string") {
        return <TeamNotFound />;
    }
    return (
        <Layout>
            <Team teamID={tid} />
        </Layout>
    );
};

export default SettingPage;
