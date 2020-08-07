import React, { ReactNode, useState } from "react";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { getAccessToken } from "../../../lib/accessToken";
import { Hidden, useMediaQuery } from "@material-ui/core";
import Header from "../../Header/Header";
import clsx from "clsx";
import Sidebar from "../../Sidebar/Sidebar";
import Layout from "../Layout";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

type Props = {
    children?: ReactNode;
    title?: string;
};
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 70,
        height: "100%",
        [theme.breakpoints.up("sm")]: {
            paddingTop: 64,
        },
    },
    shiftContent: {
        paddingLeft: 240,
    },
    content: {
        height: "100%",
    },
    fab: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default function Settings({ children }: { children: ReactNode }) {
    const accessToken = getAccessToken();
    const router = useRouter();
    if (!accessToken) {
        router.push("/");
    }
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
        defaultMatches: true,
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <Layout title={"Settings"}>
            <div
                className={clsx({
                    [classes.root]: true,
                    [classes.shiftContent]: isDesktop,
                })}
            >
                <Header />
                <Hidden lgUp>
                    <Fab
                        color="primary"
                        className={classes.fab}
                        onClick={() => {
                            setOpenSidebar((open) => !open);
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </Hidden>
                <Sidebar
                    onClose={handleSidebarClose}
                    open={shouldOpenSidebar}
                    variant={isDesktop ? "persistent" : "temporary"}
                />
                <main className={classes.content}>{children}</main>
            </div>
        </Layout>
    );
}
