import React, { useState } from 'react';
import { ColoredPaper } from '../coloredPaper/ColoredPaper';
import { DateAvatar } from '../DateAvatar/DateAvatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
export function EventListItem() {
  const classes = useStyles();
  return (
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
  );
}
