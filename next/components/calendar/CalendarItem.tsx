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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            border: "1px solid rgba(0, 0, 0, .125)",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "50.00%",
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            flexBasis: "50.00%",
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

//ExpansionPanels
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

//Radio Options
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



export default function CalendarItem(props: {
    key: React.ReactNode;
    name: React.ReactNode;
    type: React.ReactNode;
    date: React.ReactNode;
    address: React.ReactNode;
    going: React.ReactNode;
    notGoing: React.ReactNode;
    notResponded: React.ReactNode;
}) {
    const classes = useStyles();
    //Radio
    const [selectedValue, setSelectedValue] = React.useState("c");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    //Select
    const [availability, setAvailability] = React.useState("");
    const handleChangeAvailability = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAvailability(event.target.value as string);
    };


    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    //expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                >
                    <div className={classes.heading} align="left">
                        <h3>{props.name}</h3>
                        <p>{props.date}</p>
                        <p>{props.address}</p>
                    </div>
                    <div className={classes.secondaryHeading} align="right">
                        <FormControl variant="filled" className={classes.formControl} align="left">
                            <InputLabel>Availability</InputLabel>
                            <Select
                                value={availability}
                                onChange={handleChangeAvailability}
                                label="Availability"
                                defaultValue="notResponded"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            >
                                <MenuItem value="going">Going</MenuItem>
                                <MenuItem value="notGoing">Not Going</MenuItem>
                                {/* <MenuItem value="notResponded">Not Responded</MenuItem> */}
                            </Select>
                        </FormControl>

                    </div>
                    {/* <div className={classes.secondaryHeading} align="right">
                            Going
                            <GreenRadio
                                checked={selectedValue === "a"}
                                onChange={handleChange}
                                value="a"
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "A" }}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            /><br></br>
                            Not going
                            <RedRadio
                                checked={selectedValue === "b"}
                                onChange={handleChange}
                                value="b"
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "B" }}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            /><br></br>
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
                    </div> */}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.tertiaryHeading} align="left">
                        <p>Going: {props.going.length}</p>
                        {props.going.map((c) => (
                            <Tooltip title={c} placement="top">
                                <IconButton size="small">
                                    <span title={c}>
                                        <AccountCircleIcon className={classes.greenIcon} />
                                    </span>
                                </IconButton>
                            </Tooltip>
                        ))}
                    </div>
                    <div className={classes.spacing}></div>
                    <div className={classes.tertiaryHeading} align="left">
                        <p>Not Going: {props.notGoing.length}</p>
                        {props.notGoing.map((c) => (
                            <Tooltip title={c} placement="top">
                                <IconButton size="small">
                                    <AccountCircleIcon className={classes.redIcon} />
                                </IconButton>
                            </Tooltip>
                        ))}
                    </div>
                    <div className={classes.spacing}></div>
                    <div className={classes.tertiaryHeading} align="left">
                        <p>Not Responded: {props.notResponded.length}</p>
                        {props.notResponded.map((c) => (
                            <Tooltip title={c} placement="top">
                                <IconButton size="small">
                                    <AccountCircleIcon />
                                </IconButton>
                            </Tooltip>
                        ))}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
