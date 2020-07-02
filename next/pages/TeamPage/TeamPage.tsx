import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, Avatar } from "@material-ui/core";
import { EventList } from "../../components/eventList/EventList";
import Post from "../../components/post/Post";
import { selectPosts, postAsync, PostInterface } from "../../components/post/postSlice";
import { useSelector, useDispatch } from "react-redux";
import PostCreator from "../../components/post/PostCreator";
import { selectPinnedPosts } from "../../components/post/pinnedpostSlice";
import Link from "next/link";

const useStyles = makeStyles({
    container: {
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
        maxWidth: "25vw",
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
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-evenly",
    },
    teamContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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

const posts = ["e", "e", "dfg"];
function TeamPage() {
    const classes = useStyles();
    // for (let i = 0; i < 3; i++) {
    //   const date = new Date();
    //   date.setDate(date.getDate() + i * 4);
    //   const title = `Event ${i}`;
    //   const detail = `sdofhsepohgr;kdznfbo ${i}`;
    //   const event: EventListItemType = { date: date, title: title, body: detail };
    //   events.push(event);
    // }
    const posts1 = useSelector(selectPosts);
    const pinnedpost = useSelector(selectPinnedPosts);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("load posts");
        dispatch(postAsync());
    }, []);
    return (
        // <NoSsr>
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
                        <div>
                            <Typography variant={"h5"}>UPCOMING...</Typography>
                            <EventList />
                        </div>
                    </div>
                </Card>
            </div>
            <div className={classes.rightColumn}>
                <div className={classes.columnItem}>
                    {pinnedpost.map((post: PostInterface, index: number) => {
                        return (
                            <div key={index} className={classes.columnItem}>
                                <Post index={index} post={post} />
                            </div>
                        );
                    })}
                </div>
                <div className={classes.columnItem}>
                    <PostCreator />
                </div>
                <div className={classes.columnItem}>
                    <Card className={classes.rosterCard}>
                        <div className={classes.rosterText}>
                            <Typography variant={"h5"}>Roster</Typography>
                        </div>
                        <div className={classes.rosterContainer}>
                            {posts.map((name, index) => {
                                return (
                                    <div key={index} className={classes.rosterAvatar}>
                                        {/*<Link href={"/"}>*/}
                                        <Avatar key={index}>{name}</Avatar>
                                        {/*</Link>*/}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
                {posts1.map((post: PostInterface, index: number) => {
                    return (
                        <div key={index} className={classes.columnItem}>
                            <Post index={index} post={post} />
                        </div>
                    );
                })}
            </div>
        </div>
        // </NoSsr>
    );
}

export default TeamPage;
