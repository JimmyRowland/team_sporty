import { GetStaticPaths } from "next";
import { initializeApollo } from "./apollo";
import { GetTeamIDsDocument, Team } from "../generated/graphql";

export const getTeamStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initializeApollo();
    const teams = await apolloClient.query({
        query: GetTeamIDsDocument,
    });
    const paths = teams.data.getTeams.map(({ team }: { team: Team }) => {
        return { params: { tid: team._id } };
    });
    return { paths, fallback: false };
};
