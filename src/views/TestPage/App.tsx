import React from 'react';
import logo from '../../logo.svg';
import { Counter } from '../../features/counter/Counter';
import './App.css';
import { ColoredPaper } from '../../features/components/coloredPaper/ColoredPaper';
import { DateAvatar } from '../../features/DateAvatar/DateAvatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, Avatar } from '@material-ui/core';
import { EventList } from '../../features/eventList/EventList';
import { EventListItemType, monthArray } from '../../interface/Interface';
import PersonalInfoTab from '../../features/PersonalInfoTab/PersonalInfoTab';
import TeamList from '../../features/teamList/TeamList';
import Post from '../../features/post/Post';
import CardPersonalPage from '../../features/cardPersonalPage/CardPersonalPage';
const useStyles = makeStyles({
  container: {
    paddingTop: 90,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  avatar: {
    height: 120,
    width: 120,
  },
  rosterAvatar: {
    padding: 7,
  },
  leftColumn: {
    flexBasis: '25%',
  },
  rightColumn: {
    // flexGrow:1
    flexBasis: '70%',
  },
  columnItem: {
    marginBottom: 20,
  },
  leftInnerContainer: {
    height: '87vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  teamContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rosterContainer: {
    display: 'flex',
    padding: 10,
  },
  rosterText: {
    padding: 7,
  },
});
//TODO 100% height fixed column

const posts = ['e', 'e', 'dfg'];
function TestPage() {
  const classes = useStyles();
  const events = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i * 4);
    const title = `Event ${i}`;
    const detail = `sdofhsepohgr;kdznfbo ${i}`;
    const event: EventListItemType = { date: date, title: title, body: detail };
    events.push(event);
  }
  return (
    <div className={classes.container}>
      {/*<div className={classes.leftColumn}>*/}
      {/*  <Card raised={true}>*/}
      {/*    <div className={classes.leftInnerContainer}>*/}
      {/*      <div className={classes.teamContainer}>*/}
      {/*        <Avatar className={classes.avatar}>T</Avatar>*/}
      {/*        <Typography variant={'h4'}>Team name</Typography>*/}
      {/*        <Typography variant={'subtitle1'}>something</Typography>*/}
      {/*        <Typography variant={'subtitle2'}>somethingElse</Typography>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <Typography variant={'h5'}>UPCOMING...</Typography>*/}
      {/*        <EventList events={events} />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </Card>*/}
      {/*</div>*/}
      {/*<div className={classes.rightColumn}>*/}
      {/*  <div className={classes.columnItem}>*/}
      {/*    <Post index={0} />*/}
      {/*  </div>*/}
      {/*  <div className={classes.columnItem}>*/}
      {/*    <Card>*/}
      {/*      <div className={classes.rosterText}>*/}
      {/*        <Typography variant={'h5'}>Roster</Typography>*/}
      {/*      </div>*/}
      {/*      <div className={classes.rosterContainer}>*/}
      {/*        {posts.map((name, index) => {*/}
      {/*          return (*/}
      {/*            <div key={index} className={classes.rosterAvatar}>*/}
      {/*              <Avatar key={index}>{name}</Avatar>*/}
      {/*            </div>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*      </div>*/}
      {/*    </Card>*/}
      {/*  </div>*/}
      {/*  {posts.map((post, index) => {*/}
      {/*    return (*/}
      {/*      <div key={index} className={classes.columnItem}>*/}
      {/*        <Post index={index} />*/}
      {/*      </div>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
    </div>
  );
}

export default TestPage;
