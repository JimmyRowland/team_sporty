import { GetStaticPaths } from "next";
import { initializeApollo } from "./apollo";
import { GetMyTeamListDocument, GetTeamIDsDocument, GetTeamListAsCoachDocument, Team } from "../generated/graphql";

export const getAllTeamStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initializeApollo();
    const teams = await apolloClient.query({
        query: GetTeamIDsDocument,
    });
    const paths = teams.data.getTeams.map(({ team }: { team: Team }) => {
        return { params: { tid: team._id } };
    });
    return { paths, fallback: false };
};

export const getMyTeamStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initializeApollo();
    const teams = await apolloClient.query({
        query: GetMyTeamListDocument,
    });
    const paths = teams.data.getTeams.map(({ team }: { team: Team }) => {
        return { params: { tid: team._id } };
    });
    return { paths, fallback: false };
};

export const getTeamStaticPathsAsCoach: GetStaticPaths = async () => {
    const apolloClient = initializeApollo();
    const teams = await apolloClient.query({
        query: GetTeamListAsCoachDocument,
    });
    const paths = teams.data.getTeams.map(({ team }: { team: Team }) => {
        return { params: { tid: team._id } };
    });
    return { paths, fallback: false };
};
