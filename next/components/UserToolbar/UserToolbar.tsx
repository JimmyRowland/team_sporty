import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SearchToolbar from "./SearchInput/SearchToolbar";

const useStyles = makeStyles((theme) => ({
    root: {},
    row: {
        height: "42px",
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(1),
    },
    spacer: {
        flexGrow: 1,
    },
    searchInput: {
        marginRight: theme.spacing(1),
    },
}));

const UsersToolbar = ({ children }: { children: ReactNode[] | ReactNode }) => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.root)}>
            <div className={classes.row}>
                <span className={classes.spacer} />
                {children}
            </div>
            <div className={classes.row}>
                <SearchToolbar className={classes.searchInput} placeholder="Search user" />
            </div>
        </div>
    );
};

UsersToolbar.propTypes = {
    className: PropTypes.string,
};

export default UsersToolbar;
