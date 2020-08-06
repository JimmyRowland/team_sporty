import React, { ReactNode } from "react";
import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useSetGoingMutation } from "../../generated/graphql";

//styles
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
            height: "100px",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "30.00%",
            flexShrink: 0,
            align: "left",
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            flexBasis: "70.00%",
            flexShrink: 0,
            display: "flex",
            justifyContent: "flex-end",
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

//custom expansion panel
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

//custon expansion panel
const ExpansionPanelDetailsUpdated = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: "rgba(255,255,255,.1)",
    },
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

    //event availability handler
    const [selectedValue, setSelectedValue] = React.useState(isGoing);
    const [setGoing] = useSetGoingMutation();
    const handleChangeAvailability = (e: any) => {
        setSelectedValue(+e.target.value);
        setGoing({ variables: { eventID: event._id, isGoing: +e.target.value } }).then(() => {
            refetch();
        });
    };

    //date to readable time
    const eventDate = new Date(date);
    const eventDateString = eventDate.toDateString();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const eventMonth = monthNames[eventDate.getMonth()];
    const eventYear = eventDate.getFullYear();
    const eventDay = eventDateString.slice(8, 11);
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
                <ExpansionPanelSummary aria-label="Expand" aria-controls="additional-actions1-content">
                    <div className={classes.heading}>
                        <h3>{name}</h3>
                        <p>{timeString + ". " + eventMonth + " " + eventDay + ", " + eventYear}</p>
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
                            </Select>
                        </FormControl>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetailsUpdated>
                    <div className={classes.tertiaryHeading}>
                        <p>Going: {usersGoing.length}</p>
                        <div className={classes.roster}>{usersGoing}</div>
                    </div>
                    <div className={classes.spacing} />
                    <div className={classes.tertiaryHeading}>
                        <p>Not Going: {usersNotGoing.length}</p>
                        <div className={classes.roster}>{usersNotGoing}</div>
                    </div>
                    <div className={classes.spacing} />
                    <div className={classes.tertiaryHeading}>
                        <p>Not Responded: {usersNoResponse.length}</p>
                        <div className={classes.roster}>{usersNoResponse}</div>
                    </div>
                </ExpansionPanelDetailsUpdated>
            </ExpansionPanel>
        </div>
    );
}
