import React, { ReactNode } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Event, EventUserResEnum, useMeQuery, useSetGoingMutation } from "../../generated/graphql";
import { Avatar } from "@material-ui/core";
import { LoadingMembers } from "../components/loadingComponents/LoadingMembers";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            border: "1px solid rgba(50, 50, 50, 1)",
            borderRadius: "5px",
        },
        roster: {
            display: "flex",
            flexWrap: "wrap",
            height: "100px"
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "84.00%",
            flexShrink: 0,
            align: "left",
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            flexBasis: "16.00%",
            flexShrink: 0,
            align: "right",
        },
        tertiaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.primary,
            flexBasis: "27%",
            flexShrink: 0,
            align: "left",
        },
        spacing: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            flexBasis: "3%",
            flexShrink: 0,
        },
        greenIcon: {
            color: "green",
        },
        redIcon: {
            color: "red",
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
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

const ExpansionPanelDetailsUpdated = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: "rgba(255,255,255,.1)",
    }
}))(ExpansionPanelDetails);




export default function CalendarItem({
    name,
    type,
    date,
    address,
    event,
    isGoing,
    usersNotGoing,
    usersGoing,
    usersNoResponse,
    refetch,
}: {
    name: string;
    type: string;
    date: string;
    address: string;
    event: any;
    isGoing: number;
    usersNotGoing: ReactNode[];
    usersGoing: ReactNode[];
    usersNoResponse: ReactNode[];
    refetch: () => Promise<any>;
}) {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState(isGoing);
    const [setGoing] = useSetGoingMutation();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(+e.target.value);
        setGoing({ variables: { eventID: event._id, isGoing: +e.target.value } }).then(() => {
            refetch();
        });
    };
    const [availability, setAvailability] = React.useState(isGoing);
    const handleChangeAvailability = (e: any) => {
        setSelectedValue(+e.target.value);
        setGoing({ variables: { eventID: event._id, isGoing: +e.target.value } }).then(() => {
            refetch();
        });
    };

    const eventDate = new Date(date);
    function formatAMPM(date: Date) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesString = minutes < 10 ? "0" + minutes : minutes;
        const strTime = hours + ":" + minutesString + " " + ampm;
        return strTime;
    }
    const timeString = formatAMPM(eventDate);

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    //expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                >
                    <div className={classes.heading}>
                        <h3>{name}</h3>
                        <p>{timeString}</p>
                        <p>{address}</p>
                    </div>
                    <div className={classes.secondaryHeading}>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel>Availability</InputLabel>
                            <Select
                                value={selectedValue}
                                onChange={handleChangeAvailability}
                                label="Availability"
                                defaultValue="notResponded"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            >
                                <MenuItem value={1}>Going</MenuItem>
                                <MenuItem value={0}>Not Going</MenuItem>
                                {/* <MenuItem value="notResponded">Not Responded</MenuItem> */}
                            </Select>
                        </FormControl>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetailsUpdated>
                    <div className={classes.tertiaryHeading}>
                        <p>Going: {usersGoing.length}</p>
                        <div className={classes.roster}>{usersGoing}</div>
                    </div>
                    <Typography className={classes.spacing}></Typography>
                    <div className={classes.tertiaryHeading}>
                        <p>Not Going: {usersNotGoing.length}</p>
                        <div className={classes.roster}>{usersNotGoing}</div>
                    </div>
                    <Typography className={classes.spacing}></Typography>
                    <div className={classes.tertiaryHeading}>
                        <p>Not Responded: {usersNoResponse.length}</p>
                        <div className={classes.roster}>{usersNoResponse}</div>
                    </div>
                </ExpansionPanelDetailsUpdated>
            </ExpansionPanel>
        </div>
    );
}
