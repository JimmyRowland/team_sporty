import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      height: 800,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 'none',
      borderRadius: 15,
    },
    container: {
      height: '30%',
      width: '100%',
      margin: 'auto',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    coverphoto: {
      textAlign: 'center',
      height: '60%',
      width: '80%',
      borderRadius: 15,
      backgroundColor: '#C4C4C4',
      margin: 'auto',
      marginTop: '1em',
    },
    closecontainer: {
      height: '5%',
    },
    close: {
      position: 'absolute',
      right: '1em',
    },
    field: {
      display: 'block',
      width: '60%',
      height: '50%',
      borderRadius: 15,
      resize: 'none',
      margin: 'auto',
      marginTop: '2em',
      fontSize: 18,
    },
    icon: {
      textAlign: 'center',
      height: 100,
      width: 100,
      borderRadius: '50%',
      backgroundColor: '#C4C4C4',
      margin: 'auto',
      marginTop: '1em',
    },
    edit: {
      textAlign: 'center',
      display: 'flex',
      margin: 'auto',
      backgroundColor: '#346DFF',
      color: 'white',
      borderRadius: 15,
      width: 100,
      height: 30,
    },
  }),
);

export default function EditPopUp() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <div className={classes.closecontainer}>
        <IconButton aria-label="close" className={classes.close}>
          <CloseIcon onClick={handleClose} />
        </IconButton>
      </div>
      <div className={classes.container}>
        <div className={classes.title}>Profile Picture</div>
        <div className={classes.icon}> Icon </div>
      </div>
      <div className={classes.container}>
        <div className={classes.title}>Cover Photo</div>
        <div className={classes.coverphoto}> Photo</div>
      </div>
      <div className={classes.container}>
        <div className={classes.title}>Personal Info</div>
        <textarea className={classes.field} />
      </div>
      <Button variant="contained" color="primary" disableElevation className={classes.edit} onClick={handleClose}>
        Edit
      </Button>
    </div>
  );

  return (
    <div>
      <Button variant="contained" color="primary" disableElevation className={classes.edit} onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
