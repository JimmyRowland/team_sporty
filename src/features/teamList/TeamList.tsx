import React from 'react';
import TeamItem from './TeamItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardPersonalPage from '../cardPersonalPage/CardPersonalPage';
import List from '@material-ui/core/List';


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
