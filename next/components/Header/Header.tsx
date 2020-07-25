import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { People, Event, ExitToApp, Settings, AccountCircle } from "@material-ui/icons";
import { Button, Toolbar, AppBar } from "@material-ui/core";
import Link from "next/link";
import { getAccessToken, setAccessToken } from "../../lib/accessToken";
import { useLogoutMutation } from "../../generated/graphql";
import Router, { useRouter } from "next/router";

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
});
// TODO use appbar to handle small screen
export default function Header() {
    const classes = useStyles();
    const router = useRouter();
    const accessToken = getAccessToken();
    const routes = ["/teamsearch", "/event"];
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
                <Link href="/">
                    <img alt={"sporty"} src={"/static/img/unnamed.png"} className={classes.logo} />
                </Link>

                <Tabs
                    value={tabValue === -1 ? false : tabValue}
                    onChange={handleTabClick}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label={<People />} />
                    <Tab label={<Event />} />
                </Tabs>
                <div>
                    {!!accessToken ? (
                        <Fragment>
                            <Button onClick={handleLogout}>
                                <ExitToApp />
                            </Button>
                            <Link href={"/settings"}>
                                <Button>
                                    <Settings />
                                </Button>
                            </Link>
                            <Link href={"/"}>
                                <Button>
                                    <AccountCircle />
                                </Button>
                            </Link>
                        </Fragment>
                    ) : null}
                </div>
            </Toolbar>
        </AppBar>
    );
}
