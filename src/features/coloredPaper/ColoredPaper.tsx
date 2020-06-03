import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import { Colors } from '../../interface/Interface';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  red: {
    backgroundColor: '#ef9a9a',
  },
  blue: {
    backgroundColor: '#90caf9',
  },
  indigo: {
    backgroundColor: '#9fa8da',
  },
  green: {
    backgroundColor: '#aed581',
  },
  paper: {
    width: '100%',
  },
});
export function ColoredPaper({ color, children }: { color: Colors; children?: ReactNode }) {
  const classes = useStyles();
  const style = (color: Colors) => {
    if (color === 'red') {
      return classes.red;
    }
    if (color === 'blue') {
      return classes.blue;
    }
    if (color === 'indigo') {
      return classes.indigo;
    }
    return classes.green;
  };
  return (
    <Paper elevation={2} className={classnames(style(color), classes.paper)}>
      {children}
    </Paper>
  );
}
