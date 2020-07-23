import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles, withStyles, createMuiTheme } from "@material-ui/core/styles";
import { green, red, grey } from "@material-ui/core/colors";
//import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
//import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
//import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Event, EventUserResEnum, useMeQuery, useSetGoingMutation } from "../../generated/graphql";
import { Avatar } from "@material-ui/core";
import { LoadingMembers } from "../components/loadingComponents/LoadingMembers";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            border: "1px solid rgba(0, 0, 0, .125)",
        },
        roaster: {
            display: "flex",
        },
        avatar: {
            marginRight: theme.spacing(1),
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "80.00%",
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            flexBasis: "20.00%",
            flexShrink: 0,
        },
        tertiaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            flexBasis: "27%",
            flexShrink: 0,
        },
        spacing: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            flexBasis: "5%",
            flexShrink: 0,
        },
        greenIcon: {
            color: "green",
        },
        redIcon: {
            color: "red",
        },
    }),
);

const GreenRadio = withStyles({
    root: {
        color: green[400],
        "&$checked": {
            color: green[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);
const RedRadio = withStyles({
    root: {
        color: red[400],
        "&$checked": {
            color: red[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);
const GreyRadio = withStyles({
    root: {
        color: grey[400],
        "&$checked": {
            color: grey[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: "rgba(0,0,0,.03)",
        borderBottom: "1px solid rgba(0,0,0,.125)",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56,
        },
    },
    content: {
        "&$expanded": {
            margin: "12px 0",
        },
    },
    expanded: {},
})((props) => <MuiExpansionPanelSummary {...props} />);
let renders = 0;
export default function CalendarItem({
    name,
    type,
    date,
    address,
    event,
}: {
    name: string;
    type: string;
    date: string;
    address: string;
    event: Event;
}) {
    let radio = 2;
    console.log(renders++);
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState(2);
    const [setGoing] = useSetGoingMutation();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(+e.target.value);
        radio = -1;
        setGoing({ variables: { eventID: event._id, isGoing: +e.target.value } });
    };
    const { data, loading } = useMeQuery();
    if (loading) {
        return <LoadingMembers />;
    }
    const usersNotGoing = [];
    const usersGoing = [];
    const usersNoResponse = [];
    for (const response of event.usersResponse) {
        if (response.isGoing === EventUserResEnum.NoResponse) {
            usersNoResponse.push(
                <Avatar className={classes.avatar} src={response.user.avatarUrl}>
                    {response.user.name[0].toUpperCase()}
                </Avatar>,
            );
        } else if (response.isGoing === EventUserResEnum.Going) {
            usersGoing.push(
                <Avatar className={classes.avatar} src={response.user.avatarUrl}>
                    {response.user.name[0].toUpperCase()}
                </Avatar>,
            );
            if (data && data.me && data.me._id === response.user._id) {
                radio = 1;
            }
        } else {
            usersNotGoing.push(
                <Avatar className={classes.avatar} src={response.user.avatarUrl}>
                    {response.user.name[0].toUpperCase()}
                </Avatar>,
            );
            if (data && data.me && data.me._id === response.user._id) {
                radio = 0;
            }
        }
    }
    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    //expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                >
                    <Typography className={classes.heading} align="left">
                        <h3>{name}</h3>
                        <p>{date}</p>
                        <p>{address}</p>
                    </Typography>
                    <Typography className={classes.secondaryHeading} align="right">
                        <Typography align="right">
                            Going
                            <GreenRadio
                                checked={selectedValue === 1 || radio === 1}
                                onChange={handleChange}
                                value={1}
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "A" }}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            />
                        </Typography>
                        <Typography align="right">
                            Not going
                            <RedRadio
                                checked={selectedValue === 0 || radio === 0}
                                onChange={handleChange}
                                value={0}
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "B" }}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            />
                        </Typography>
                        <Typography align="right">
                            Not Responded
                            <GreyRadio
                                checked={selectedValue === 2}
                                onChange={handleChange}
                                value={2}
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "C" }}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            />
                        </Typography>
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.tertiaryHeading} align="left">
                        <p>Going: {usersGoing.length}</p>
                        <div className={classes.roaster}>{usersGoing}</div>
                    </Typography>
                    <Typography className={classes.spacing}></Typography>
                    <Typography className={classes.tertiaryHeading} align="left">
                        <p>Not Going: {usersNotGoing.length}</p>
                        <div className={classes.roaster}>{usersNotGoing}</div>
                    </Typography>
                    <Typography className={classes.spacing}></Typography>
                    <Typography className={classes.tertiaryHeading} align="left">
                        <p>Not Responded: {usersNoResponse.length}</p>
                        <div className={classes.roaster}>{usersNoResponse}</div>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
