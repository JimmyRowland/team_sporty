import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, Avatar } from "@material-ui/core";
import { EventList } from "../../components/eventList/EventList";
import PostComponent from "../../components/post/PostComponent";
import PostCreator from "../../components/post/PostCreator";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import MessageBoard from "../../components/post/MessageBoard";
import Layout from "../../../components/layouts/settings/Layout";
import {
    GetTeamIDsDocument,
    GetTeamPageDocument,
    Team,
    useGetCoachesQuery,
    useGetMembersQuery,
    useGetTeamListAsCoachQuery,
    useGetTeamPageQuery,
} from "../../../generated/graphql";
import { initializeApollo } from "../../../lib/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import { StaticPropsResponseType } from "../../../interfaces/Interface";
import { useRouter } from "next/router";
import { TeamNotFound } from "../../../components/error/TeamNotFound";
import { LoadingMembers } from "../../../components/components/loadingComponents/LoadingMembers";
import UsersTable from "../../../components/UserTable/UserTable";
import UsersToolbar from "../../../components/UserToolbar/UserToolbar";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
}));

function CoachesPage() {
    const classes = useStyles();
    const router = useRouter();
    const { tid } = router.query;
    if (typeof tid !== "string") {
        return <TeamNotFound />;
    }
    const { data, loading, error } = useGetCoachesQuery({
        variables: {
            teamID: tid,
        },
        pollInterval: 500,
    });
    if (loading || !data || !data.getCoaches) return <LoadingMembers />;
    if (error) return <TeamNotFound />;

    return (
        <Layout title="Settings">
            <div className={classes.root}>
                <UsersToolbar />
                <div className={classes.content}>
                    <UsersTable users={data.getCoaches} />
                </div>
            </div>
        </Layout>
    );
}

export default CoachesPage;
