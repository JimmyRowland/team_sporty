import React, { ReactNode } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Colors } from '../../interface/Interface';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  avatar: {
    width: '100px',
    height: '100px',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  month: {
    fontSize: '10px',
  },
  date: {
    fontSize: '20px',
  },
});
// TODO: Find a dateTime object.
export function DateAvatar({ date, month }: { date: number; month: string }) {
  const classes = useStyles();
  return (
    <Avatar className={classes.avatar}>
      <div className={classes.container}>
        <p className={classes.month}>{month}</p>
        <p className={classes.date}>{date}</p>
      </div>
    </Avatar>
  );
}
