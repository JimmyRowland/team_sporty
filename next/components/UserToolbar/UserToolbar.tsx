import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SearchToolbar from "./SearchInput/SearchToolbar";
import { useSelector } from "react-redux";
import { selectSeletedUserState } from "../UserTable/userTableSlice";
import { useAddCoachMutation, useRemoveMemberMutation } from "../../generated/graphql";

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
    importButton: {
        marginRight: theme.spacing(1),
    },
    exportButton: {
        marginRight: theme.spacing(1),
    },
    searchInput: {
        marginRight: theme.spacing(1),
    },
}));

const UsersToolbar = (props: any) => {
    const { className, ...rest } = props;
    const selectedUsers = useSelector(selectSeletedUserState);
    const [removeUser] = useRemoveMemberMutation();
    const [addCoach] = useAddCoachMutation();
    const classes = useStyles();

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <div className={classes.row}>
                <span className={classes.spacer} />
                <Button className={classes.importButton}>Import</Button>
                <Button className={classes.exportButton}>Export</Button>
                <Button color="primary" variant="contained">
                    Add user
                </Button>
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
