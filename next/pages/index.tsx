import Layout from "../components/layouts/index/Layout";
import React from "react";
import Frontpage from "../components/FrontPage/App";
import { getAccessToken } from "../lib/accessToken";
import PersonalPage from "../components/PersonalPage/App";

const IndexPage = () => {
    return getAccessToken() === "" ? (
        <Frontpage />
    ) : (
        <Layout title="Frontpage">
            <PersonalPage />
        </Layout>
    );
};

export default IndexPage;
