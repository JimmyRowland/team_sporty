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
            border: "1px solid rgba(0, 0, 0, .125)",
        },
        roaster: {
            display: "flex",
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
            color: theme.palette.text.secondary,
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
let renders = 0;
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
    console.log(renders++);
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
                        <p>{date}</p>
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
                        {/* <div align="right">
                            Going
                            <GreenRadio
                                checked={selectedValue === 1}
                                onChange={handleChange}
                                value={1}
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "A" }}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            />
                        </div>
                        <div align="right">
                            Not going
                            <RedRadio
                                checked={selectedValue === 0}
                                onChange={handleChange}
                                value={0}
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "B" }}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                            />
                        </div>
                        <div align="right">
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
                        </div> */}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.tertiaryHeading}>
                        <p>Going: {usersGoing.length}</p>
                        <div className={classes.roaster}>{usersGoing}</div>
                    </div>
                    <Typography className={classes.spacing}></Typography>
                    <div className={classes.tertiaryHeading}>
                        <p>Not Going: {usersNotGoing.length}</p>
                        <div className={classes.roaster}>{usersNotGoing}</div>
                    </div>
                    <Typography className={classes.spacing}></Typography>
                    <div className={classes.tertiaryHeading}>
                        <p>Not Responded: {usersNoResponse.length}</p>
                        <div className={classes.roaster}>{usersNoResponse}</div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
