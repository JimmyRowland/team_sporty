import React, { forwardRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Button, colors } from "@material-ui/core";
import { useGetTeamListAsCoachQuery } from "../../../generated/graphql";
import PeopleIcon from "@material-ui/icons/People";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ImageIcon from "@material-ui/icons/Image";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import ListItemProps from "../../../interfaces/Interface";
import Link from "next/link";

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
}));

const SidebarNav = () => {
    const classes = useStyles();
    const { data, loading, error } = useGetTeamListAsCoachQuery();
    const teamPages: ListItemProps[] =
        data &&
        data.getTeamsAsCoach &&
        data.getTeamsAsCoach.map((team, index) => {
            return {
                title: team.name,
                href: `/settings/team/${team._id}`,
                icon: <PeopleIcon />,
            };
        });
    const pages: ListItemProps[] = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: <DashboardIcon />,
        },
        {
            title: "Users",
            href: "/users",
            icon: <PeopleIcon />,
        },
        {
            title: "Products",
            href: "/products",
            icon: <ShoppingBasketIcon />,
        },
        {
            title: "Authentication",
            href: "/sign-in",
            icon: <LockOpenIcon />,
        },
        {
            title: "Typography",
            href: "/typography",
            icon: <TextFieldsIcon />,
        },
        {
            title: "Icons",
            href: "/icons",
            icon: <ImageIcon />,
        },
        {
            title: "Account",
            href: "/account",
            icon: <AccountBoxIcon />,
        },
        {
            title: "Settings",
            href: "/settings",
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
        </List>
    );
};

export default SidebarNav;
