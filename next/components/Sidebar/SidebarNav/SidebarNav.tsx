import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Button } from "@material-ui/core";
import {
    useGetTeamListAsCoachQuery,
    useGetTeamListAsMemberOrCoachQuery,
    useLogoutMutation,
} from "../../../generated/graphql";
import PeopleIcon from "@material-ui/icons/People";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { ListItemProps } from "../../../interfaces/Interface";
import NestedTeamItem from "./NestedTeamItem";
import Link from "next/link";
import { setAccessToken } from "../../../lib/accessToken";
import Router from "next/router";
import { ExitToApp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {},
    item: {
        display: "flex",
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        padding: "10px 8px",
        justifyContent: "flex-start",
        textTransform: "none",
        letterSpacing: 0,
        width: "100%",
        fontWeight: theme.typography.fontWeightMedium,
    },
    icon: {
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(1),
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        "& $icon": {
            color: theme.palette.primary.main,
        },
    },
    nav: {
        marginBottom: theme.spacing(2),
    },
    nested: {
        paddingLeft: theme.spacing(2),
    },
}));

const SidebarNav = () => {
    const classes = useStyles();
    const { data, loading } = useGetTeamListAsMemberOrCoachQuery();
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const [logout, { client }] = useLogoutMutation();
    const handleLogout = async () => {
        await logout();
        setAccessToken("");
        await Router.push("/");
        await client?.resetStore();
    };
    const pages: ListItemProps[] = [
        {
            title: "Performance (stretch)",
            href: "/",
            icon: <DashboardIcon />,
        },
        {
            title: "Authentication (change password email)",
            href: "/authentication",
            icon: <LockOpenIcon />,
        },
        {
            title: "Team change avatar, address sport and more",
            href: "/settings/account",
            icon: <AccountBoxIcon />,
        },
        {
            title: "Place holder",
            href: "/",
            icon: <SettingsIcon />,
        },
    ];

    return (
        <List className={clsx(classes.root, classes.nav)}>
            {pages.map((page) => (
                <Link key={page.title} href={page.href}>
                    <ListItem className={classes.item} disableGutters>
                        <Button className={classes.button}>
                            <div className={classes.icon}>{page.icon}</div>
                            {page.title}
                        </Button>
                    </ListItem>
                </Link>
            ))}
            <ListItem button onClick={handleClick} className={classes.item} disableGutters>
                <Button className={classes.button}>
                    <div className={classes.icon}>
                        <PeopleIcon />
                    </div>
                    {"Teams"}
                </Button>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.nested}>
                    {!loading && data && data.getTeamsAsMemberOrCoach
                        ? data.getTeamsAsMemberOrCoach.map((team, index) => {
                              return (
                                  <NestedTeamItem
                                      _id={team.team._id}
                                      name={team.team.name}
                                      isCoach={team.isCoach}
                                      key={index}
                                  />
                              );
                          })
                        : null}
                </List>
            </Collapse>
            <ListItem className={classes.item} disableGutters onClick={handleLogout}>
                <Button className={classes.button}>
                    <div className={classes.icon}>
                        <ExitToApp />
                    </div>
                    Log Out
                </Button>
            </ListItem>
        </List>
    );
};

export default SidebarNav;
