import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import { Colors } from '../../../interface/Interface';
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
    borderRadius: '1rem',
  },
});
export function ColoredPaper({ color, children }: { color: Colors; children?: ReactNode }) {
  const classes = useStyles();
  const map = { red: classes.red, blue: classes.blue, indigo: classes.indigo, green: classes.green };
  return (
    <Paper elevation={5} className={classnames(map[color], classes.paper)}>
      {children}
    </Paper>
  );
}
