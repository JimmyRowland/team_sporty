import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import ComputerIcon from "@material-ui/icons/Computer";
import { useGetTeamListAsMemberOrCoachQuery } from "../../generated/graphql";
import { useDispatch } from "react-redux";
import { setTeam } from "../CalendarPage/CalendarPageSlicer";

//customized Menu
const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));

//styles for span icon
const useStyles = makeStyles({
    toTheRight: {
        display: "flex",
        justifyContent: "flex-end",
    },
});

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

//team switching menu
export default function CustomizedMenus() {
    const classes = useStyles();
    //drop down menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { data, loading } = useGetTeamListAsMemberOrCoachQuery();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const dispatch = useDispatch();

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!loading && data && data.getTeamsAsMemberOrCoach) {
        return (
            <div>
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Switch Teams
                    <ListItemIcon className={classes.toTheRight}>
                        <ExpandMoreIcon fontSize="small" />
                    </ListItemIcon>
                </Button>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem
                        onClick={() => {
                            dispatch(setTeam({ name: "All", _id: "" }));
                        }}
                    >
                        <ListItemIcon>
                            <ComputerIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="All" />
                    </StyledMenuItem>
                    {data.getTeamsAsMemberOrCoach.map((team, index) => {
                        return (
                            <StyledMenuItem
                                key={index}
                                onClick={() => {
                                    dispatch(setTeam({ name: team.team.name, _id: team.team._id }));
                                }}
                            >
                                <ListItemIcon>
                                    <SportsSoccerIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={team.team.name} />
                            </StyledMenuItem>
                        );
                    })}
                </StyledMenu>
            </div>
        );
    } else {
        //return <LoadingMembers />;
        return <div />;
    }
}
