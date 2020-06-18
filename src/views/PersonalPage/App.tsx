import React from 'react';
import logo from '../../logo.svg';
import { Counter } from '../../features/counter/Counter';
import './App.css';
import { ColoredPaper } from '../../features/components/coloredPaper/ColoredPaper';
import { DateAvatar } from '../../features/DateAvatar/DateAvatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { EventList } from '../../features/eventList/EventList';
import { EventListItemType, monthArray } from '../../interface/Interface';
import PersonalInfoTab from '../../features/PersonalInfoTab/PersonalInfoTab';
import TeamList from '../../features/teamList/TeamList';
import CardPersonalPage from '../../features/cardPersonalPage/CardPersonalPage';
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
const teamlist = [
  { id: 1, name: 'Richmond FC' },
  { id: 2, name: 'Richmond Raiders' },
  { id: 3, name: 'Richmond CSGO' },
];
function PersonalPage() {
  const classes = useStyles();
  // const events = [];
  // for (let i = 0; i < 3; i++) {
  //   const date = new Date();
  //   date.setDate(date.getDate() + i * 4);
  //   const title = `Event ${i}`;
  //   const detail = `sdofhsepohgr;kdznfbo ${i}`;
  //   const event: EventListItemType = { date: date, title: title, detail: detail };
  //   events.push(event);
  // }
  return (
    <div>
      <PersonalInfoTab name={'Nameless'} info={'#1 star'} />
      <div className={classes.container}>
        <div className={classes.columnContainer}>
          <CardPersonalPage title="UPCOMING...">
            <EventList />
          </CardPersonalPage>
        </div>
        <div className={classes.columnContainer}>
          <TeamList teamlist={teamlist} />
        </div>
      </div>
    </div>
  );
}

export default PersonalPage;
