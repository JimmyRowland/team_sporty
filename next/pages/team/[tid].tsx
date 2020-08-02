import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, CircularProgress } from "@material-ui/core";
import PostComponent from "../../components/post/PostComponent";
import PostCreator from "../../components/post/PostCreator";
import Layout from "../../components/layouts/index/Layout";
import { Waypoint } from "react-waypoint";
import {
    GetPostsDocument,
    GetTeamPageStaticDocument,
    useGetPostsQuery,
    useGetTeamPageFirstFetchQuery,
    useGetTeamPageStaticQuery,
} from "../../generated/graphql";
import { initializeApollo } from "../../lib/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import TeamDisplayPannel from "../../components/teamDisplayPannel/TeamDisplayPannel";
import { getAllTeamStaticPaths } from "../../lib/staticPaths";

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
        minWidth: "250px",
        minHeight: "650px",
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
    const { data } = useGetTeamPageStaticQuery({
        variables: {
            teamID: id,
        },
    });
    const { data: events } = useGetTeamPageFirstFetchQuery({
        variables: {
            teamID: id,
            limit: 3,
        },
    });
    const { data: postsQuery, fetchMore, loading, networkStatus, refetch } = useGetPostsQuery({
        variables: {
            teamID: id,
            limit: 10,
            skip: 0,
        },
        partialRefetch: true,
        notifyOnNetworkStatusChange: true,
    });
    const [{ hasNext, skip }, setHasNext] = useState({ hasNext: true, skip: 10 });
    const posts = !loading && postsQuery && postsQuery.getPosts ? postsQuery.getPosts : data.getPosts;
    return (
        <Layout title={data?.getTeam.team.name}>
            <div className={classes.container}>
                <div className={classes.leftColumn}>
                    <TeamDisplayPannel
                        isCoach={events ? events.getTeam.isCoach : false}
                        imgUrl={data.getTeam.team.imgUrl}
                        name={data.getTeam.team.name}
                        events={events ? events.getEventsOfOneTeam : []}
                        id={data.getTeam.team._id}
                        description={data.getTeam.team.description}
                    />
                </div>
                <div className={classes.rightColumn}>
                    <div className={classes.columnItem}>
                        {posts.map((post, index) => {
                            return !post.isPined ? null : (
                                <PostComponent
                                    key={index}
                                    index={index}
                                    content={post.content}
                                    firstName={post.user.name}
                                    avatarUrl={post.user.avatarUrl}
                                    lastModifyDate={post.lastModifyDate}
                                    isPinned={post.isPined}
                                    postID={post._id}
                                    teamID={id}
                                    isCoach={events?.getTeam.isCoach}
                                    imgUrls={post.imgUrls}
                                    comments={post.comments}
                                />
                            );
                        })}
                    </div>
                    <div className={classes.columnItem}>
                        <PostCreator teamID={id} setHasNext={setHasNext} refetch={refetch} />
                    </div>
                    {data?.getPosts?.map((post, index) => {
                        return (
                            <Fragment key={index}>
                                {post.isPined ? null : (
                                    <PostComponent
                                        key={index}
                                        index={index}
                                        content={post.content}
                                        firstName={post.user.name}
                                        lastModifyDate={post.lastModifyDate}
                                        isPinned={post.isPined}
                                        postID={post._id}
                                        teamID={id}
                                        isCoach={events?.getTeam.isCoach}
                                        avatarUrl={post.user.avatarUrl}
                                        imgUrls={post.imgUrls}
                                    />
                                )}
                                {hasNext && index === postsQuery?.getPosts.length - 10 && (
                                    <Waypoint
                                        onEnter={({ previousPosition, currentPosition, event }) => {
                                            return fetchMore({
                                                variables: {
                                                    skip: skip,
                                                    limit: 10,
                                                },
                                                updateQuery: (pv, { fetchMoreResult }) => {
                                                    if (!fetchMoreResult) {
                                                        return pv;
                                                    }
                                                    if (fetchMoreResult.getPosts.length < 10) {
                                                        setHasNext({
                                                            hasNext: false,
                                                            skip: skip + fetchMoreResult.getPosts.length,
                                                        });
                                                    } else {
                                                        setHasNext({
                                                            hasNext: true,
                                                            skip: skip + fetchMoreResult.getPosts.length,
                                                        });
                                                    }
                                                    return {
                                                        getPosts: [...pv.getPosts, ...fetchMoreResult.getPosts],
                                                    };
                                                },
                                            });
                                        }}
                                    />
                                )}
                            </Fragment>
                        );
                    })}
                    {networkStatus === 3 && <LinearProgress className={classes.columnItem} />}
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
            query: GetTeamPageStaticDocument,
            variables: { teamID: tid },
        });
        return { props: { id: tid, initialApolloState: apolloClient.cache.extract() } };
    } catch (err) {
        return { props: { errors: err.message } };
    }
};
