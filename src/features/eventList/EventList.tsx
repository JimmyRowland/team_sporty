import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { EventListItemType } from '../../interface/Interface';
import { Card, CardHeader } from '@material-ui/core';
import { EventListItem } from './EventListItem';
const useStyles = makeStyles({
  eventItemContainer: {
    minHeight: 350,
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: '0 16px',
  },
});
export function EventList({ events }: { events: EventListItemType[] }) {
  const classes = useStyles();
  return (
    <div className={classes.eventItemContainer}>
      {events.map((event, index) => {
        return <EventListItem event={event} key={index} />;
      })}
    </div>
  );
}
