import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Logout = () => {
  const classes = useStyles();

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;