import React from "react";
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            border: "1px solid rgba(0, 0, 0, .125)",
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

export default function CalendarItem(props: {
    name: React.ReactNode;
    type: React.ReactNode;
    date: React.ReactNode;
    address: React.ReactNode;
    going: React.ReactNode;
    notGoing: React.ReactNode;
    notResponded: React.ReactNode;
}) {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState("c");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    //expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                >
                    <Typography className={classes.heading} align="left">
                        <h3>{props.name}</h3>
                        <p>{props.date}</p>
                        <p>{props.address}</p>
                    </Typography>
                    <Typography className={classes.secondaryHeading} align="right">
                        <Typography align="right">
                            Going
                            <GreenRadio
                                checked={selectedValue === "a"}
                                onChange={handleChange}
                                value="a"
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "A" }}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            />
                        </Typography>
                        <Typography align="right">
                            Not going
                            <RedRadio
                                checked={selectedValue === "b"}
                                onChange={handleChange}
                                value="b"
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "B" }}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            />
                        </Typography>
                        <Typography align="right">
                            Not Responded
                            <GreyRadio
                                checked={selectedValue === "c"}
                                onChange={handleChange}
                                value="c"
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
                        <p>Going: {props.going}</p>
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                        <AccountCircleIcon className={classes.greenIcon} />
                    </Typography>
                    <Typography className={classes.spacing}></Typography>
                    <Typography className={classes.tertiaryHeading} align="left">
                        <p>Not Going: {props.notGoing}</p>
                        <AccountCircleIcon className={classes.redIcon} />
                        <AccountCircleIcon className={classes.redIcon} />
                    </Typography>
                    <Typography className={classes.spacing}></Typography>
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
