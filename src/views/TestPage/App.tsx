import React from 'react';
import logo from '../../logo.svg';
import { Counter } from '../../features/counter/Counter';
import './App.css';
import { ColoredPaper } from '../../features/coloredPaper/ColoredPaper';
import { DateAvatar } from '../../features/DateAvatar/DateAvatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  descriptionContainer: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
  },
  titleContainer: {
    justifyContent: 'flex-end',
  },
  detailContainer: {},
  title: {},
  detail: {},
});
function TestPage() {
  const classes = useStyles();
  return (
    <div className="App">
      <ColoredPaper color={'red'}>
        <div className={classes.container}>
          <div>
            <DateAvatar date={2} month={'Jun'} />
          </div>
          <div className={classes.descriptionContainer}>
            <div className={classes.titleContainer}>
              <Typography variant={'h6'} component={'p'} className={classes.title}>
                title
              </Typography>
            </div>
            <div className={classes.detailContainer}>
              <Typography variant={'subtitle1'} className={classes.detail}>
                detail
              </Typography>
            </div>
          </div>
        </div>
      </ColoredPaper>
      <ColoredPaper color={'blue'}>
        <h3>head</h3>
      </ColoredPaper>
    </div>
  );
}

export default TestPage;
