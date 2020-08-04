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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from "next/link";

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

    //drop down
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
                className={classes.heading}
                avatar={<GroupIcon />}
                action={
                    <div>
                        <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <Link href={"/teamList"}><MenuItem>View All</MenuItem></Link>
                        </Menu>
                    </div>
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
                                description={team.description}
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
