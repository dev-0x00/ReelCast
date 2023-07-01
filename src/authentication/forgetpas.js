import React from 'react';

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@material-ui/core';

import  {FcGoogle}  from 'react-icons/fc';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import { ApolloClient, HttpLink, InMemoryCache, gql } from 'apollo-boost';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    boxShadow: "none",
    marginTop: "20%",
    marginLeft: "20%"
    
  },
  paper: {
    padding: theme.spacing(4),
    border: "1px solid #0047FF",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '350px',
    maxHeight: "300px",
    borderRadius: '5px',
  },
  form: {
    width: '100%',
    MaxHeight: "500px",
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  avatar: {
    width: "50px",
    height: "50px",
    color: "white",
    background: "#0047FF",
    borderRadius: "50%",
  },

  textField: {
    '& label.Mui-focused': {
      color: '#0047FF',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0047FF',
      },
      '&:hover fieldset': {
        borderColor: '#0047FF',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'grey',
      },
      '& .MuiOutlinedInput-multiline': {
        height: '20px',
      },
    },
  },
  
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%',
    height: "2.5rem",
    color: "#0047FF",
    background: "white",
    border: "1px solid #0047FF"
  },

  socialLoginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  socialText: {
    margin: 0,
    marginBottom: theme.spacing(1),
    fontSize: '0.875rem',
    fontWeight: '500',
    color: theme.palette.text.secondary,
  },
  googleButton: {
    color: "#0047FF",
    background: "white",
    textTransform: 'none',
    fontWeight: '500',
    borderRadius: '4px',
    border: `1px solid #0047FF`,
    width: '100%',
    '&:hover': {
      border: `1px solid #0047FF`,
      background: "#0047FF",
      color: "white",
    },
    '& .MuiIcon-root': {
      marginRight: theme.spacing(2),
      marginTop: "-10px"
    },
  },
  eyeIcon: {
    cursor: 'pointer',
    color: 'grey',
    '&:hover': {
      color: '#0047FF',
    },
  },
}));

const ForgetInput = () => {
  const classes = useStyles(); 
  const [emailError, setEmailError] = useState("");


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const client = new ApolloClient({
    link: new HttpLink({
      uri: 'http://0.0.0.0:8000/graphql/',
  
    }),
    cache: new InMemoryCache(),
  });

  const CREATE_USER = gql`
  mutation Reset($email: String!) {
    resetPassword(email: $email) {
        success
      }
  }
`;

const sendMutate = () => {
  client.mutate({
    mutation: CREATE_USER,
    variables: {
      email: formData.email,
    },
  })
  .then((result) => {
    if(result.data.resetPassword.success === true){
        setEmailError('Check your email to reset your password');
    }
    
  })
  .catch((error) => {
    setEmailError('Credentials do not match.');
  });
}

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMutate()
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        
        <h2>Reset Password</h2>
        <form className={classes.form}  onSubmit={handleSubmit}>
        <Typography  style={{color: '#0047FF'}} variant="caption">
        {emailError}
      </Typography>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            width="300px"
            autoFocus
            onChange={handleInputChange}
          />
        </FormControl>
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
          >
            Request Reset
          </Button>
          <Grid style={{marginTop: "5px"}}  container>
        <Grid item xs>
          </Grid>
          <Grid item>
          <Link  style={{cursor: "pointer", color: "#0047FF"}} to="/login" variant="body2">
          {"login"}
          </Link>
        </Grid>
        </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default ForgetInput;


