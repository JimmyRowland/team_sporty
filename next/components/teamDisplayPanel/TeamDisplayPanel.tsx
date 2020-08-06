import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Avatar, Card, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import List from "@material-ui/core/List";
import PersonalCalendarItem from "../PersonalPage/PersonalCalendarItem";
import ClubImageUpload from "../ImageUpload/ClubImageUpload/ClubImageUpload";
import EditIcon from "@material-ui/icons/Edit";
import { useGetTeamPageStaticQuery, useUpdateDescriptionMutation } from "../../generated/graphql";
import TextField from "@material-ui/core/TextField";

//styles
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
            [theme.breakpoints.down("sm")]: {
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            },
        },
        text: {},
        text2: {
            fontWeight: "lighter",
        },
        calendarContainer: {
            display: "block",
            height: "60%",
            align: "center",
            [theme.breakpoints.down("sm")]: {
                width: "300px",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                marginBottom: theme.spacing(3),
            },
        },
        calendarItemsContainer: {
            height: "80%",
            overflowY: "auto",
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
            [theme.breakpoints.down("sm")]: {
                marginBottom: theme.spacing(1),
            },
        },
        eventButton: {
            margin: "auto",
        },
        caption: {
            float: "inherit",
        },
        descriptionContainer: {
            display: "flex",
            alignItems: "center",
            marginTop: theme.spacing(1),
        },
    }),
);

const ImageUpload = ({
    isCoach,
    teamID,
    imgUrl,
    classes,
}: {
    isCoach: boolean;
    teamID: string;
    imgUrl: string;
    classes: any;
}) => {
    return isCoach ? (
        <ClubImageUpload teamID={teamID} imgUrl={imgUrl} />
    ) : (
        <Avatar className={classes.avatar} src={imgUrl} />
    );
};

//Create Event Button
const TeamMangementPortal = ({ tid, isCoach }: { tid: string; isCoach: boolean }) => {
    const classes = useStyles();
    return isCoach ? (
        <Link href="/addEvent/[tid]" as={`/addEvent/${tid}`}>
            <Button className={classes.eventButton}> Create Event </Button>
        </Link>
    ) : null;
};

const ModifyDescription = ({
    desDisplay,
    classes,
    description,
    onDescription,
    editDescription,
}: {
    desDisplay: boolean;
    classes: any;
    description: string;
    onDescription: any;
    editDescription: any;
}) => {
    return desDisplay ? (
        <Typography variant={"subtitle1"} className={classes.text2} onClick={editDescription}>
            {description}
        </Typography>
    ) : (
        <div>
            <TextField
                variant="outlined"
                placeholder={description}
                size="small"
                className={classes.text}
                onKeyDown={(e) => onDescription(e)}
            />
            <Typography variant="caption" className={classes.caption}>
                Press enter to confirm edit.
            </Typography>
        </div>
    );
};

const DescriptionDisplay = ({
    desDisplay,
    classes,
    description,
    onDescription,
    editDescription,
    isCoach,
}: {
    desDisplay: boolean;
    classes: any;
    description: string;
    onDescription: any;
    editDescription: any;
    isCoach: boolean;
}) => {
    return isCoach ? (
        <div className={classes.descriptionContainer}>
            <ModifyDescription
                desDisplay={desDisplay}
                classes={classes}
                description={description}
                editDescription={editDescription}
                onDescription={onDescription}
            />
            <Button onClick={editDescription}>
                <EditIcon />
            </Button>
        </div>
    ) : (
        <Typography variant={"subtitle1"} className={classes.text}>
            {description}
        </Typography>
    );
};

//panel on team page
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
    if (description === "" && isCoach) description = "No Description";

    const onDescription = (e) => {
        let description = e.target.value;
        if (!description) description = "No Description";
        if (e.keyCode == 13) {
            updateDescrpition({
                variables: {
                    teamID: id,
                    description: description,
                },
            }).then(() => {
                refetch();
                editDescription();
            });
        }
        if (e.keyCode == 27) {
            editDescription();
        }
    };

    const editDescription = () => {
        setDesDisplay(!desDisplay);
    };

    return (
        <Card raised={true} className={classes.leftCard}>
            <div className={classes.leftInnerContainer}>
                <div className={classes.teamContainer}>
                    <ImageUpload teamID={id} imgUrl={imgUrl} classes={classes} isCoach={isCoach} />
                    <Typography variant={"h4"} className={classes.text}>
                        {" "}
                        {name}{" "}
                    </Typography>
                    <DescriptionDisplay
                        desDisplay={desDisplay}
                        classes={classes}
                        description={description}
                        editDescription={editDescription}
                        onDescription={onDescription}
                        isCoach={isCoach}
                    />
                </div>
                <div className={classes.calendarContainer}>
                    <Typography variant={"h6"} align="center">
                        Upcoming Events
                    </Typography>
                    <div className={classes.calendarItemsContainer}>
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
