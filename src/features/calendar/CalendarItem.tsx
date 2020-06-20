import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AvailabilityButton from './AvailabilityButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      flexBasis: '60.00%',
      flexShrink: 0,
    },
    tertiaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      flexBasis: '33.33%',
      flexShrink: 0,
    },
  }),
);


function CalendarItem(props: {
  name: React.ReactNode,
  type: React.ReactNode,
  date: React.ReactNode,
  address: React.ReactNode,
  going: React.ReactNode,
  notGoing: React.ReactNode,
  notResponded: React.ReactNode,
}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  let numberGoing = [];
  let numberNotGoing = [];
  let numberNotResponded = [];

  
  return (
    <div>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading} align='left'>
            <h3>{props.name}</h3>
            <p>{props.date}</p>
            <p>{props.address}</p>
          </Typography>
          <Typography className={classes.secondaryHeading} align='right'>
            <AvailabilityButton />
            </Typography>
        </ExpansionPanelSummary>        
        <ExpansionPanelDetails>
          <Typography className={classes.tertiaryHeading} align='left'>
            <p>Going: {props.going}</p>
            <AccountCircleIcon />
          </Typography>
          <Typography className={classes.tertiaryHeading} align='left'>
            <p>Not Going: {props.notGoing}</p>
          </Typography>
          <Typography className={classes.tertiaryHeading} align='left'>
            <p>Not Responded: {props.notResponded}</p>
          </Typography>
        </ExpansionPanelDetails>

      </ExpansionPanel>
    </div>
  );
}

export default CalendarItem;








// function TeamItem(props: { name: React.ReactNode, record: React.ReactNode }) {
//   return (
//     <div>
//       <Button fullWidth>
//         <ListItem>
//           <ListItemAvatar>
//             <Avatar>
//               <ImageIcon />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText primary={props.name} secondary={props.record} />
//         </ListItem>
//       </Button>
//     </div>
//   );
// }

// export default TeamItem;
