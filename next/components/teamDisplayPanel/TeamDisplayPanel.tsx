import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Avatar, Card, Typography } from "@material-ui/core";
//import { EventList } from "../eventList/EventList";
import Link from "next/link";
import React, { useState } from "react";
import List from "@material-ui/core/List";
import PersonalCalendarItem from "../PersonalPage/PersonalCalendarItem";
import ClubImageUpload from "../ImageUpload/ClubImageUpload/ClubImageUpload";
import {
    useGetTeamPageStaticQuery,
    useUpdateDescriptionMutation,
    useUpdateTeamMutation,
} from "../../generated/graphql";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        leftCard: {
            height: "100%",
            borderRadius: "15px",
        },
        leftInnerContainer: {
            height: "100%",
            width: "100%",
            padding: "1em",
            align: "center",
            textAlign: "center",
        },
        text: {
            marginTop: theme.spacing(1),
        },
        calendarContainer: {
            marginTop: theme.spacing(1),
            display: "block",
            padding: "1em",
            height: "60%",
            align: "center",
        },
        teamContainer: {
            margin: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            height: 120,
            width: 120,
            marginBottom: theme.spacing(1),
        },
        eventButtonContainer: {
            position: "absolute",
            bottom: theme.spacing(1),
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
        },
        eventButton: {
            margin: "auto",
        },
        caption: {
            float: "left",
        },
    }),
);

const TeamMangementPortal = ({ tid, isCoach }: { tid: string; isCoach: boolean }) => {
    const classes = useStyles();
    return isCoach ? (
        <Link href="/addEvent/[tid]" as={`/addEvent/${tid}`}>
            <Button className={classes.eventButton}> Create Event </Button>
        </Link>
    ) : null;
};

export default function TeamDisplayPannel({
    isCoach,
    imgUrl,
    name,
    events,
    id,
    description,
}: {
    isCoach: boolean;
    imgUrl: string;
    name: string;
    events: any;
    id: string;
    description: string;
}) {
    const [updateDescrpition] = useUpdateDescriptionMutation();
    const classes = useStyles();
    const [desDisplay, setDesDisplay] = useState(true);
    const { data, refetch } = useGetTeamPageStaticQuery({
        variables: {
            teamID: id,
        },
    });
    if (description === "") description = "No Description";
    const ImageUpload = () => {
        return isCoach ? (
            <ClubImageUpload teamID={id} imgUrl={imgUrl} />
        ) : (
            <Avatar className={classes.avatar} src={imgUrl} />
        );
    };

    const OnDescription = (e) => {
        let description = e.target.value;
        if(!description) description = "No Description";
        if (e.keyCode == 13) {
            updateDescrpition({
                variables: {
                    teamID: id,
                    description: description,
                },
            }).then(() => {
                refetch();
                EditDescription();
            });
        }
        if (e.keyCode == 27) {
            EditDescription();
        }
    };

    const EditDescription = () => {
        setDesDisplay(!desDisplay);
    };

    const ModifyDescription = () => {
        return desDisplay ? (
            <Typography variant={"subtitle1"} className={classes.text} onClick={EditDescription}>
                {description}
            </Typography>
        ) : (
            <div>
                <TextField
                    variant="outlined"
                    placeholder={description}
                    size="small"
                    className={classes.text}
                    onKeyDown={(e) => OnDescription(e)}
                />
                <Typography variant="caption" className={classes.caption}>
                    Press enter to edit/ ESC cancel
                </Typography>
            </div>
        );
    };

    const DescriptionDisplay = () => {
        return isCoach ? (
            <ModifyDescription />
        ) : (
            <Typography variant={"subtitle1"} className={classes.text}>
                {description}
            </Typography>
        );
    };
    return (
        <Card raised={true} className={classes.leftCard}>
            <div className={classes.leftInnerContainer}>
                <div className={classes.teamContainer}>
                    <ImageUpload />
                    <Typography variant={"h4"} className={classes.text}>
                        {" "}
                        {name}{" "}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.text}>
                        Team Description:
                    </Typography>
                    <DescriptionDisplay />
                </div>
                <br></br>
                <div className={classes.calendarContainer}>
                    <Typography variant={"h6"} align="center">
                        Upcoming Events
                    </Typography>
                    <div>
                        {events ? (
                            <List>
                                {events.map((c: any) => (
                                    <PersonalCalendarItem
                                        key={c._id}
                                        name={c.name}
                                        date={c.startDate}
                                        address={c.address}
                                    />
                                ))}
                            </List>
                        ) : null}
                    </div>
                </div>
                <div className={classes.eventButtonContainer}>
                    <TeamMangementPortal tid={id} isCoach={isCoach} />
                </div>
            </div>
        </Card>
    );
}
