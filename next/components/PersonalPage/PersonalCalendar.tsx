import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useGetEventsOfAllTeamsQuery } from "../../generated/graphql";
import PersonalCalendarItem from "../PersonalPage/PersonalCalendarItem";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "next/link";

//styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            borderRadius: "1rem",
            minHeight: 310,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "33.33%",
            flexShrink: 0,
        },
        cardHeader2: {
            paddingBottom: 1,
        },
        cardContent2: {
            paddingTop: 0,
            paddingBottom: 0,
        },
    }),
);

//calendar card on profile page
function PersonalCalendar() {
    const classes = useStyles();

    //get first 3 events
    const { data } = useGetEventsOfAllTeamsQuery({ variables: { skip: 0, limit: 3 } });

    //drop down menu from top right of card
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                classes={{ root: classes.cardHeader2 }}
                className={classes.heading}
                avatar={<CalendarTodayIcon />}
                action={
                    <div>
                        <IconButton
                            aria-label="settings"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <Link href={"/event"}>
                                <MenuItem>View All</MenuItem>
                            </Link>
                        </Menu>
                    </div>
                }
                titleTypographyProps={{ variant: "h5" }}
                title="Your Upcoming Events"
            />
            <CardContent classes={{ root: classes.cardContent2 }}>
                <List className={classes.root}>
                    {data?.getEventsOfAllTeams?.map((c) => (
                        <PersonalCalendarItem key={c._id} name={c.name} date={c.startDate} address={c.address} />
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
export default PersonalCalendar;
