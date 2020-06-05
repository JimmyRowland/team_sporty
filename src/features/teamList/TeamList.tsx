import React from 'react';
import TeamItem from './TeamItem';
import {Card, CardHeader} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import CardPersonalPage from "../cardPersonalPage/CardPersonalPage";

const useStyles = makeStyles({

  head2: {
    textAlign: 'left',
    color: 'black',
    textShadow: '1px 1px white',
  },

  teamlistContainer: {
    width: '40%',
    margin: '1%',
    padding: '1%',
    border: '1px solid black',
    backgroundColor: 'white',
    borderRadius: '1%',
  },

  teamlist: {
    listStyleType: 'none',
    marginRight: 0,
    padding: 0,
  },
});

function TeamList(props: { teamlist: any[] }) {
  const classes = useStyles();
  return (
      <CardPersonalPage title="&nbsp; Your Teams" >
        <ul className={classes.teamlist}>
          {props.teamlist.map((c) => (
              <TeamItem key={c.id} name={c.name} />
          ))}
          <li> &nbsp; </li>
        </ul>
      </CardPersonalPage>
  );
}
export default TeamList;
