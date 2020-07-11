import Link from "next/link";
import Layout from "../components/Layout";
import React from "react";
import TeamPage from "./TeamPage/TeamPage";
import { initializeStore } from "../lib/redux";
import { initializeApollo } from "../lib/apollo";
const IndexPage = () => (
    <Layout title="TeamPage">
        <TeamPage />
    </Layout>
);
export async function getStaticProps() {
    const reduxStore = initializeStore();
    const apolloClient = initializeApollo();

    // await apolloClient.query({
    //     query: ALL_POSTS_QUERY,
    //     variables: allPostsQueryVars,
    // });
    return {
        props: {
            initialReduxState: reduxStore.getState(),
            initialApolloState: apolloClient.cache.extract(),
        },
        unstable_revalidate: 1,
    };
}
export default IndexPage;
