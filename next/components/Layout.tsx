import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { AppBar } from "@material-ui/core";

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({ children, title = "Team Sporty" }: Props) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
            <AppBar>
                <Link href="/">
                    <a>Team</a>
                </Link>{" "}
                |{" "}
                <Link href="/profile">
                    <a>Profile</a>
                </Link>{" "}
                |{" "}
                <Link href="/team">
                    <a>Team</a>
                </Link>{" "}
                |{" "}
                <Link href="/calendar">
                    <a>Calendar</a>
                </Link>
            </AppBar>
        </header>
        {children}
        <footer>
            <hr />
            <span>I&apos;m here to stay (Footer)</span>
        </footer>
    </div>
);

export default Layout;
