import React, { ReactNode } from 'react';
import { Card, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: '100%',
    borderRadius: '1rem',
    minHeight: 414,
  },
});

function CardPersonalPage({ children, title, link }: { children?: ReactNode; title: string; link?: string }) {
  const classes = useStyles();
  return (
    <Card raised={true} className={classes.card}>
      <CardHeader action={<Typography>View All</Typography>} title={title} />
      {children}
    </Card>
  );
}
export default CardPersonalPage;
