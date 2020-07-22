import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, Avatar } from "@material-ui/core";
import { EventList } from "../../components/eventList/EventList";
import PostComponent from "../../components/post/PostComponent";
import PostCreator from "../../components/post/PostCreator";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import MessageBoard from "../../components/post/MessageBoard";
import Layout from "../../components/layouts/index/Layout";
import { GetTeamIDsDocument, GetTeamPageDocument, Team, useGetTeamPageQuery } from "../../generated/graphql";
import { initializeApollo } from "../../lib/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllTeamStaticPaths } from "../../lib/staticPaths";

const useStyles = makeStyles({
    container: {
        backgroundColor: "#EFEFEF",
        paddingTop: 90,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    avatar: {
        height: 120,
        width: 120,
    },
    rosterAvatar: {
        padding: 7,
    },
    leftColumn: {
        height: "80vh",
        position: "sticky",
        top: "6vh",
        flexBasis: "25%",
        Width: "30vw",
    },
    rightColumn: {
        // flexGrow:1

        marginLeft: "1em",
        flexBasis: "70%",
        maxWidth: "70vw",
    },
    columnItem: {
        marginBottom: 20,
    },
    leftInnerContainer: {
        height: "87vh",
        display: "grid",
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-evenly",
    },
    teamContainer: {
        margin: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    eventContainer: {
        height: "50%",
        overflowY: "scroll",
    },
    rosterCard: {
        borderRadius: "15px",
    },
    rosterContainer: {
        display: "flex",
        marginLeft: "1em",
        padding: 10,
    },
    rosterText: {
        fontWeight: "bold",
        fontSize: "24px",
        marginLeft: "1em",
        marginTop: "4px",
        padding: 7,
    },
});

type Props = {
    id: string;
    errors?: string;
};

function TeamPage({ id, errors }: Props) {
    if (errors) {
        return "Error component";
    }
    const classes = useStyles();
    const { data, loading, error } = useGetTeamPageQuery({
        variables: {
            teamID: id,
        },
        pollInterval: 500,
    });

    return (
        <Layout title={data?.getTeam.team.name}>
            <div className={classes.container}>
                <div className={classes.leftColumn}>
                    <Card raised={true}>
                        <div className={classes.leftInnerContainer}>
                            <div className={classes.teamContainer}>
                                <Avatar className={classes.avatar}>T</Avatar>
                                <Typography variant={"h4"}>Team name</Typography>
                                <Typography variant={"subtitle1"}>something</Typography>
                                <Typography variant={"subtitle2"}>somethingElse</Typography>
                            </div>
                            <Typography variant={"h5"}>UPCOMING...</Typography>
                            <div className={classes.eventContainer}>
                                <EventList />
                            </div>
                            <Link href="/teammanage">
                                <Button> Team Management </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
                <div className={classes.rightColumn}>
                    <div className={classes.columnItem}>
                        {data?.getTeam.team.posts?.map((post, index) => {
                            return !post.isPined ? null : (
                                <PostComponent
                                    key={index}
                                    content={post.content}
                                    firstName={post.user.name}
                                    lastModifyDate={post.lastModifyDate}
                                    isPinned={post.isPined}
                                    postID={post._id}
                                    teamID={id}
                                    isCoach={data?.getTeam.isCoach}
                                />
                            );
                        })}
                    </div>
                    <div className={classes.columnItem}>
                        <PostCreator teamID={id} />
                    </div>
                    {/*<div className={classes.columnItem}>*/}
                    {/*    <Card className={classes.rosterCard}>*/}
                    {/*        <div className={classes.rosterText}>*/}
                    {/*            <Typography variant={"h5"}>Roster</Typography>*/}
                    {/*        </div>*/}
                    {/*        <div className={classes.rosterContainer}>*/}
                    {/*            {posts.map((name, index) => {*/}
                    {/*                return (*/}
                    {/*                    <div key={index} className={classes.rosterAvatar}>*/}
                    {/*                        /!*<Link href={"/"}>*!/*/}
                    {/*                        <Avatar key={index}>{name}</Avatar>*/}
                    {/*                        /!*</Link>*!/*/}
                    {/*                    </div>*/}
                    {/*                );*/}
                    {/*            })}*/}
                    {/*        </div>*/}
                    {/*    </Card>*/}
                    {/*</div>*/}
                    {data?.getTeam.team.posts?.map((post, index) => {
                        return post.isPined ? null : (
                            <PostComponent
                                key={index}
                                content={post.content}
                                firstName={post.user.name}
                                lastModifyDate={post.lastModifyDate}
                                isPinned={post.isPined}
                                postID={post._id}
                                teamID={id}
                                isCoach={data?.getTeam.isCoach}
                            />
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default TeamPage;

export const getStaticPaths: GetStaticPaths = getAllTeamStaticPaths;

export const getStaticProps: GetStaticProps = async (url) => {
    try {
        const tid = url.params?.tid;
        const apolloClient = initializeApollo();
        await apolloClient.query({
            query: GetTeamPageDocument,
            variables: { teamID: tid },
        });
        return { props: { id: tid, initialApolloState: apolloClient.cache.extract() } };
    } catch (err) {
        return { props: { errors: err.message } };
    }
};
