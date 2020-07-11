import Layout from "../components/Layout";
import React from "react";
import Frontpage from "./FrontPage/App";
import { getAccessToken } from "../lib/accessToken";
import PersonalPage from "./PersonalPage/App";

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
