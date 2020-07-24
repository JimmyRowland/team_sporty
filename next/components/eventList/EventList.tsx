import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { EventListItemType } from "../../interfaces/Interface";
import { Card, CardHeader } from "@material-ui/core";
import { EventListItem } from "./EventListItem";
import { useSelector, useDispatch } from "react-redux";
import { eventAsync, selectEvents } from "./eventSlice";
const useStyles = makeStyles({
    eventItemContainer: {
        minHeight: 350,
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        padding: "0 16px",
    },
});
export function EventList() {
    const events = useSelector(selectEvents);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log('on load');
        dispatch(eventAsync());
    }, []);
    return (
        <div className={classes.eventItemContainer}>
            {events.map((event, index) => {
                return index < 3 ? <EventListItem event={event} key={index} /> : null;
            })}
        </div>
    );
}
