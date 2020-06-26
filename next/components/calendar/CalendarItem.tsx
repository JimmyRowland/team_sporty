import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AvailabilityButton from "./AvailabilityButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "33.33%",
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            flexBasis: "60.00%",
            flexShrink: 0,
        },
        tertiaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            flexBasis: "27%",
            flexShrink: 0,
        },
        palette: {
            primary: {
                light: "#757ce8",
                main: "#3f50b5",
                dark: "#002884",
                contrastText: "#fff",
            },
            secondary: {
                light: "#ff7961",
                main: "#f44336",
                dark: "#ba000d",
                contrastText: "#000",
            },
        },
    }),
);

function CalendarItem(props: {
    name: React.ReactNode;
    type: React.ReactNode;
    date: React.ReactNode;
    address: React.ReactNode;
    going: React.ReactNode;
    notGoing: React.ReactNode;
    notResponded: React.ReactNode;
}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const numberGoing = [];
    const numberNotGoing = [];
    const numberNotResponded = [];

    return (
        <div>
            <ExpansionPanel expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <ExpansionPanelSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading} align="left">
                        <h3>{props.name}</h3>
                        <p>{props.date}</p>
                        <p>{props.address}</p>
                    </Typography>
                    <Typography className={classes.secondaryHeading} align="right">
                        <AvailabilityButton />
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.tertiaryHeading} align="left">
                        <p>Going: {props.going}</p>
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                        <AccountCircleIcon color="primary" />
                    </Typography>
                    <Typography className={classes.tertiaryHeading} align="left">
                        <p>Not Going: {props.notGoing}</p>
                        <AccountCircleIcon color="secondary" />
                        <AccountCircleIcon color="secondary" />
                    </Typography>

                    <Typography className={classes.tertiaryHeading} align="left">
                        <p>Not Responded: {props.notResponded}</p>
                        <AccountCircleIcon />
                        <AccountCircleIcon />
                        <AccountCircleIcon />
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

export default CalendarItem;
