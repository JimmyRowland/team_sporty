import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import { GTranslate } from "@material-ui/icons";
import { Team, useApplyTeamMutation } from "../../generated/graphql";
import Card from "@material-ui/core/Card";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            width: "90%",
            maxWidth: "800px",
            height: "150px",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "auto",
            margin: "auto",
        },
        clubIMGContainer: {
            position: "relative",
            height: "80%",
            width: "25%",
            margin: "auto",
        },
        clubIMG: {
            margin: "auto",
            width: theme.spacing(13),
            height: theme.spacing(13),
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
        },
        infoContainer: {
            height: "80%",
            width: "50%",
            margin: "auto",
            paddingLeft: theme.spacing(1),
            display: "block",
        },
        infoLine1items: {
            display: "inline",
            padding: "5px",
            fontSize: "24px",
            fontWeight: "bold",
        },
        infoLine2items: {
            display: "inline",
            padding: "5px",
            fontWeight: 300,
            fontSize: "12px",
        },
        infoLine3: {
            marginTop: "5px",
            textAlign: "center",
        },
        infoLine3items: {
            padding: "5px",
            fontSize: "16px",
        },
        addButtonContainer: {
            position: "relative",
            height: "80%",
            width: "15%",
            padding: theme.spacing(2),
            margin: "auto",
        },
        addButton: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
        },
    }),
);

export default function ClubDisplayTab({
    name,
    sport,
    numberMembers,
    description,
    teamID,
    isMember,
    teamimage,
    isPending,
    isDisplayOnly,
}: {
    name: string;
    sport: string;
    numberMembers: number;
    description: string;
    teamID: string;
    isMember: boolean;
    teamimage: string;
    isPending: boolean;
    isDisplayOnly: boolean;
}) {
    const classes = useStyles();
    const [joinTeam, loading] = useApplyTeamMutation({ variables: { teamID: teamID } });
    const [applied, setApplied] = useState(isPending);
    const handleJoinTeam = () => {
        setApplied(true);
        joinTeam();
    };

    const JoinButton = () => {
        if (isMember && isDisplayOnly)
            return (
                <Button disabled variant="contained" color="secondary" className={classes.addButton}>
                    Joined
                </Button>
            );
        else if (isMember)
            return (
                <Link href={"/team/[tid]"} as={`/team/${teamID}`}>
                    <Button variant="contained" color="secondary" className={classes.addButton}>
                        Open
                    </Button>
                </Link>
            );
        else if (applied)
            return (
                <Button disabled variant="contained" color="secondary" className={classes.addButton}>
                    Pending
                </Button>
            );
        return (
            <Button onClick={handleJoinTeam} variant="contained" color="secondary" className={classes.addButton}>
                Join
            </Button>
        );
    };

    return (
        <Card className={classes.body}>
            <div className={classes.clubIMGContainer}>
                <Avatar className={classes.clubIMG} src={teamimage}></Avatar>
            </div>
            <div className={classes.infoContainer}>
                <div>
                    <div className={classes.infoLine1items}>{name}</div>
                </div>
                <div>
                    <div className={classes.infoLine2items}> {sport} </div>
                    <div className={classes.infoLine2items}> {numberMembers} members </div>
                </div>
                <div className={classes.infoLine3}>
                    <div className={classes.infoLine3items}> {description} </div>
                </div>
            </div>
            <div className={classes.addButtonContainer}>
                <JoinButton />
            </div>
        </Card>
    );
}
