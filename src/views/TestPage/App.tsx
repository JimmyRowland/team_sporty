import React from 'react';
import logo from '../../logo.svg';
import { Counter } from '../../features/counter/Counter';
import './App.css';
import { ColoredPaper } from '../../features/coloredPaper/ColoredPaper';
import { DateAvatar } from '../../features/DateAvatar/DateAvatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { EventList } from '../../features/eventList/EventList';
import { EventListItemType, monthArray } from '../../interface/Interface';
import PersonalInfoTab from '../../features/PersonalInfoTab/PersonalInfoTab';
const useStyles = makeStyles({
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '40px auto 0 auto',
    maxWidth: 1000,
  },
  columnContainer: {
    width: '47%',
  },
});
function TestPage() {
  const classes = useStyles();
  const events = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i * 4);
    const title = `Event ${i}`;
    const detail = `sdofhsepohgr;kdznfbo ${i}`;
    const event: EventListItemType = { date: date, title: title, detail: detail };
    events.push(event);
  }
  return (
    <div>
      <PersonalInfoTab name={'Nameless'} info={'#1 star'} />
      <div className={classes.container}>
        <div className={classes.columnContainer}>
          <EventList events={events} />
        </div>
        <div className={classes.columnContainer}>
          <EventList events={events} />
        </div>
      </div>
    </div>
  );
}

export default TestPage;
