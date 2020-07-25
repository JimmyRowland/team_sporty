import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PostComponent from "../../components/post/PostComponent";
import PostCreator from "../../components/post/PostCreator";
import Layout from "../../components/layouts/index/Layout";
import { GetTeamPageDocument, useGetTeamPageQuery } from "../../generated/graphql";
import { initializeApollo } from "../../lib/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import TeamDisplayPannel from "../../components/teamDisplayPannel/TeamDisplayPannel";
import { getAllTeamStaticPaths } from "../../lib/staticPaths";
import { LoadingMembers } from "../../components/components/loadingComponents/LoadingMembers";
import { useGetEventsAsCoachOrMemberQuery, useMeQuery } from "../../generated/graphql";

const useStyles = makeStyles({
    container: {
        paddingTop: 50,
        width: "90%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: "40px auto 0 auto",
        maxWidth: 1000,
    },
    rosterAvatar: {
        padding: 7,
    },
    leftColumn: {
        height: "80vh",
        position: "sticky",
        top: "8%",
        flexBasis: "25%",
        maxWidth: "30%",
        minWidth:"250px",
    },
    rightColumn: {
        marginLeft: "1em",
        flexBasis: "70%",
        maxWidth: "70%",
    },
    columnItem: {
        marginBottom: 20,
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
//TODO 100% height fixed column

type Props = {
    id: string;
    errors?: string;
};

function TeamPage({ id, errors }: Props) {
    if (errors) {
        console.log(errors);
        return "Error component";
    }
    const classes = useStyles();
    const { data, loading, error } = useGetTeamPageQuery({
        variables: {
            teamID: id,
        },
        pollInterval: 500,
    });

    const {
        data: eventsData,
        loading: eventsLoading,
        error: eventsError,
        refetch: eventsRefetch,
    } = useGetEventsAsCoachOrMemberQuery();
    const mequery = useMeQuery();
    if (eventsLoading || mequery.loading) {
        return <div>loading...</div>;
    }
    if (eventsError) {
        console.log(error);
        return <div>err</div>;
    }
    if (!eventsData || !eventsData.getTeamsAsMemberOrCoach || !mequery.data || !mequery.data.me) {
        return <div>no data</div>;
    }
    let events: any = [];
    const team = eventsData.getTeamsAsMemberOrCoach.find((value) => {
        return value.team._id === data?.getTeam.team._id;
    });
    events = team && team.team.events ? team.team.events : [];
    const condensedList = events.slice(0, 3);

    if (loading || error || !data || !data.getTeam) {
        return <LoadingMembers />;
    }
    console.log(data);
    return (
        <Layout title={data?.getTeam.team.name}>
            <div className={classes.container}>
                <div className={classes.leftColumn}>
                    <TeamDisplayPannel
                        isCoach={data.getTeam.isCoach}
                        imgUrl={data.getTeam.team.imgUrl}
                        name={data.getTeam.team.name}
                        events={condensedList}
                        id={data.getTeam.team._id}
                        description={data.getTeam.team.description}
                    />
                </div>
                <div className={classes.rightColumn}>
                    <div className={classes.columnItem}>
                        {data?.getTeam.team.posts?.map((post, index) => {
                            return !post.isPined ? null : (
                                <PostComponent
                                    key={index}
                                    content={post.content}
                                    firstName={post.user.name}
                                    avatarUrl={post.user.avatarUrl}
                                    lastModifyDate={post.lastModifyDate}
                                    isPinned={post.isPined}
                                    postID={post._id}
                                    teamID={id}
                                    isCoach={data?.getTeam.isCoach}
                                    imgUrls={post.imgUrls}
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
                                avatarUrl={post.user.avatarUrl}
                                imgUrls={post.imgUrls}
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
