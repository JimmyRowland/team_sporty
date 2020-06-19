import React, { useEffect } from 'react';
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
import { selectPosts, postAsync, PostInterface } from '../../features/post/postSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
function TeamPage() {
  const classes = useStyles();
  const events = [];
  // for (let i = 0; i < 3; i++) {
  //   const date = new Date();
  //   date.setDate(date.getDate() + i * 4);
  //   const title = `Event ${i}`;
  //   const detail = `sdofhsepohgr;kdznfbo ${i}`;
  //   const event: EventListItemType = { date: date, title: title, body: detail };
  //   events.push(event);
  // }
  const history = useHistory();
  const handleRouteChange = (route: string) => {
    history.push(route);
  };
  const posts1 = useSelector(selectPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('load posts');
    dispatch(postAsync());
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.leftColumn}>
        <Card raised={true}>
          <div className={classes.leftInnerContainer}>
            <div className={classes.teamContainer}>
              <Avatar className={classes.avatar}>T</Avatar>
              <Typography variant={'h4'}>Team name</Typography>
              <Typography variant={'subtitle1'}>something</Typography>
              <Typography variant={'subtitle2'}>somethingElse</Typography>
            </div>
            <div>
              <Typography variant={'h5'}>UPCOMING...</Typography>
              <EventList />
            </div>
          </div>
        </Card>
      </div>
      <div className={classes.rightColumn}>
        <div className={classes.columnItem}>{posts1.length > 0 ? <Post index={0} post={posts1[0]} /> : null}</div>
        <div className={classes.columnItem}>
          <Card>
            <div className={classes.rosterText}>
              <Typography variant={'h5'}>Roster</Typography>
            </div>
            <div className={classes.rosterContainer}>
              {posts.map((name, index) => {
                return (
                  <div
                    onClick={() => {
                      handleRouteChange('personal');
                    }}
                    key={index}
                    className={classes.rosterAvatar}
                  >
                    <Avatar key={index}>{name}</Avatar>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        {posts1.map((post: PostInterface, index) => {
          return (
            <div key={index} className={classes.columnItem}>
              <Post index={index} post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamPage;
