import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GroupIcon from "@material-ui/icons/Group";
import { useGetMyTeamListQuery } from "../../generated/graphql";
import TeamItem from "../../components/teamList/TeamItem";
import { ErrorComponent } from "../Error/Error";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            borderRadius: "1rem",
            minHeight: 300,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "33.33%",
            flexShrink: 0,
        },
    }),
);

function PersonalCalendar() {
    const classes = useStyles();

    const { data, loading, error } = useGetMyTeamListQuery({});
    if (error) {
        console.log(error);
        return <ErrorComponent />;
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.heading}
                avatar={<GroupIcon />}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                titleTypographyProps={{ variant: "h5" }}
                title="Your Teams"
            />
            <CardContent>
                <List className={classes.root}>
                    {data?.getMyTeams.map((team, index) => {
                        return (
                            <TeamItem
                                key={index}
                                name={team.name}
                                _id={team._id}
                                record={"0-0-0"}
                                imgUrl={team.imgUrl}
                            />
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );
}
export default PersonalCalendar;
