import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Person, People, Event, ExitToApp, Settings, AccountCircle } from "@material-ui/icons";
import { Button, Toolbar, AppBar, Hidden } from "@material-ui/core";
import Link from "next/link";
import { getAccessToken, setAccessToken } from "../../lib/accessToken";
import { useLogoutMutation } from "../../generated/graphql";
import Router, { useRouter } from "next/router";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";

const useStyles = makeStyles({
    root: {
        position: "fixed",
    },
    toolbar: {
        flexGrow: 1,
        justifyContent: "space-around",
    },
    logo: {
        height: "70px",
        cursor: "pointer",
    },
    tabs: {
        margin: "auto",
        paddingLeft: "3.2%",
    },
    icon: { fontSize: "30px" },
    tabItem: {
        width: "18vw",
        minWidth: "18vw",
    },
});
// TODO use appbar to handle small screen
export default function Header() {
    const classes = useStyles();
    const router = useRouter();
    const accessToken = getAccessToken();
    const routes = ["/profile", "/teamList", "/event", "/teamsearch", "/settings"];
    const [tabValue, setTabValue] = useState(routes.indexOf(router.asPath));
    const handleTabClick = (event: React.ChangeEvent<unknown>, newValue: number) => {
        setTabValue(newValue);
        router.push(routes[newValue]);
    };
    const [logout, { client }] = useLogoutMutation();
    const handleLogout = async () => {
        await logout();
        setAccessToken("");
        await Router.push("/");
        await client?.resetStore();
    };
    return (
        <AppBar className={classes.root} color={"inherit"}>
            <Toolbar className={classes.toolbar}>
                <Hidden smDown>
                    <Link href="/">
                        <img alt={"sporty"} src={"/static/img/unnamed.png"} className={classes.logo} />
                    </Link>
                </Hidden>
                <Hidden smDown>
                    <Tabs
                        value={tabValue === -1 || tabValue > 3 ? false : tabValue}
                        onChange={handleTabClick}
                        indicatorColor="secondary"
                        textColor="secondary"
                        centered
                        className={classes.tabs}
                    >
                        <Tab label={"MY PROFILE"} icon={<Person className={classes.icon} />} />
                        <Tab label={"MY TEAMS"} icon={<People className={classes.icon} />} />
                        <Tab label={"CALENDAR"} icon={<Event className={classes.icon} />} />
                        <Tab label={"TEAM SEARCH"} icon={<SearchIcon className={classes.icon} />} />
                    </Tabs>
                </Hidden>
                <Hidden mdUp>
                    <Tabs
                        value={tabValue === -1 ? false : tabValue}
                        onChange={handleTabClick}
                        indicatorColor="secondary"
                        textColor="secondary"
                        centered
                        className={clsx(classes.tabs)}
                    >
                        <Tab classes={{ root: classes.tabItem }} icon={<Person className={classes.icon} />} />
                        <Tab classes={{ root: classes.tabItem }} icon={<People className={classes.icon} />} />
                        <Tab classes={{ root: classes.tabItem }} icon={<Event className={classes.icon} />} />
                        <Tab classes={{ root: classes.tabItem }} icon={<SearchIcon className={classes.icon} />} />
                        <Tab classes={{ root: classes.tabItem }} icon={<Settings className={classes.icon} />} />
                    </Tabs>
                </Hidden>
                <Hidden smDown>
                    {!!accessToken ? (
                        <Fragment>
                            <Button onClick={handleLogout}>
                                <ExitToApp className={classes.icon} />
                            </Button>
                            <Link href={"/settings"}>
                                <Button>
                                    <Settings className={classes.icon} />
                                </Button>
                            </Link>
                        </Fragment>
                    ) : null}
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}
