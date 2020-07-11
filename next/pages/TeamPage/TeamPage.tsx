import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, Avatar } from "@material-ui/core";
import { EventList } from "../../components/eventList/EventList";
import Post from "../../components/post/Post";
import { selectPosts, postAsync, PostInterface } from "../../components/post/postSlice";
import { useSelector, useDispatch } from "react-redux";
import PostCreator from "../../components/post/PostCreator";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import MessageBoard from "../../components/post/MessageBoard";

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
    eventContainer:{
        height: "50%",
        overflowY:"scroll",
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
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("load posts");
        dispatch(postAsync());
    }, []);


    return (

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
                    <MessageBoard pinned={true} />
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
                <MessageBoard pinned={false} />
            </div>
        </div>
    );
}

export default TeamPage;
