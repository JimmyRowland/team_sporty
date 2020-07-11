import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { getAccessToken, setAccessToken } from "../lib/accessToken";
import { useLogoutMutation } from "../generated/graphql";
import { log } from "util";
import Router from "next/router";

type Props = {
    children?: ReactNode;
    title?: string;
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            // height: "80px",
        },
        rightButtons: {
            marginLeft: "auto",
        },
    }),
);
const Layout = ({ children, title = "Team Sporty" }: Props) => {
    const classes = useStyles();
    const accessToken = getAccessToken();
    const [logout, { client }] = useLogoutMutation();
    const handleLogout = async () => {
        await logout();
        setAccessToken("");
        await Router.push("/");
        await client?.resetStore();
    };
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header className={classes.header}>
                <AppBar>
                    <Toolbar>
                        <Link href="/">
                            <Button>Home</Button>
                        </Link>
                        <Link href="/team">
                            <Button>Team</Button>
                        </Link>
                        <Link href="/event">
                            <Button>Calendar</Button>
                        </Link>
                        <Link href="/teamsearch">
                            <Button>search</Button>
                        </Link>
                        {!!accessToken ? <Button onClick={handleLogout}>Logout</Button> : null}
                    </Toolbar>
                </AppBar>
            </header>
            {children}
            {/* <footer className={classes.footer}>
            </footer> */}
        </div>
    );
};

export default Layout;
