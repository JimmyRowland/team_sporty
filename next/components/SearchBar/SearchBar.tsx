import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import TextField from "@material-ui/core/TextField";

import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((Theme: Theme) =>
    createStyles({
        body: {
            width: "800px",
            height: "100%",
            margin: "auto",
        },
        h1: {
            display: "inline-block",
        },
        textfield: {
            display: "block",
        },
        searchButton: {
            paddingTop: "10px",
            display: "block",
            margin: "auto",
        },
    }),
);

export default function SearchBar() {
    const classes = useStyles();
    return (
        <div className={classes.body}>
            <div className={classes.h1}>
                <TextField className={classes.textfield} label="Search Team" variant="outlined" />
            </div>
            <div className={classes.h1}>
                <IconButton className={classes.searchButton}>
                    <SearchIcon />
                </IconButton>
            </div>
        </div>
    );
}
