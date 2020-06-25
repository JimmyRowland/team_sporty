import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CalendarItem from './CalendarItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      align: 'left',
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);

function CalendarList(props: { eventList: any[] }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {props.eventList.map((c) => (
          <CalendarItem key={c.id} name={c.name} type={c.type} date={c.date} address={c.address}
          going={c.going} notGoing={c.notGoing} notResponded={c.notResponded} />
        ))}
        <br></br>
    </div>
  );
}



export default CalendarList;