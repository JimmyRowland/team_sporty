import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CalendarItem2 from "./CalendarItem2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);

export default function ControlledExpansionPanels(props: { eventList: any[] }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        {props.eventList.map((c) => (
        <CalendarItem2 key={c.id} name={c.name} type={c.type} date={c.date} address={c.address}
        going={c.going} notGoing={c.notGoing} notResponded={c.notResponded}/>
        ))}
        {/* <CalendarItem2 /> */}
        <br></br><br></br><br></br>
    </div>
  );
}
