import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Drawer } from "@material-ui/core";
import Profile from "../Profile";
import SidebarNav from "./SidebarNav/SidebarNav";

type Props = {
    open: boolean;
    onClose: () => void;
    variant: "permanent" | "persistent" | "temporary" | undefined;
};

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up("lg")]: {
            marginTop: 70,
            height: "calc(100% - 64px)",
        },
    },
    root: {
        backgroundColor: theme.palette.white,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

const Sidebar = (props: Props) => {
    const { open, onClose, variant } = props;
    const classes = useStyles();

    return (
        <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
            <div className={clsx(classes.root)}>
                <Profile />
                <Divider className={classes.divider} />
                <SidebarNav />
            </div>
        </Drawer>
    );
};

export default Sidebar;
