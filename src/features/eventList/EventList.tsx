import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { EventListItemType } from '../../interface/Interface';
import { Card, CardHeader } from '@material-ui/core';
import { EventListItem } from './EventListItem';
const useStyles = makeStyles({
  card: {
    width: '100%',
    borderRadius: '1rem',
  },
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
    <Card raised={true} className={classes.card}>
      <CardHeader action={<Typography>View All</Typography>} title="UPCOMMING..." />
      <div className={classes.eventItemContainer}>
        {events.map((event, index) => {
          return <EventListItem event={event} key={index} />;
        })}
      </div>
    </Card>
  );
}
