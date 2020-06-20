import React from 'react';
import TeamItem from './TeamItem';
import { Card, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardPersonalPage from '../cardPersonalPage/CardPersonalPage';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 360,
  },
});

function TeamList(props: { teamlist: any[] }) {
  const classes = useStyles();
  return (
    <CardPersonalPage title="&nbsp; Your Teams">
      <List className={classes.root}>
      {props.teamlist.map((c) => (
          <TeamItem key={c.id} name={c.name} record={c.record} />
        ))}
    </List>
    </CardPersonalPage>
  );
}
export default TeamList;
