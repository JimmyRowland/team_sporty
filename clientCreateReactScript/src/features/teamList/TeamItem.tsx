import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
function TeamItem(props: { name: React.ReactNode; record: React.ReactNode }) {
  const history = useHistory();
  const handleRouteChange = (route: string) => {
    history.push(route);
  };
  return (
    <div
      onClick={() => {
        handleRouteChange('/team');
      }}
    >
      <Button fullWidth>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.name} secondary={props.record} />
        </ListItem>
      </Button>
    </div>
  );
}

export default TeamItem;
