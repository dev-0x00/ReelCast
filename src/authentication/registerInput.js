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
    marginTop: "15%",
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
    maxHeight: "550px",
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
    marginTop: "30px",
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

const RegisterInput = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false); 
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

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMutate()
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleGoogleLoginFailure(error) {
    console.error(error);
  }

    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
          "799344324929-nedvjfigm47te1s4rj1c6odenljj6dc7.apps.googleusercontent.com",
        plugin_name: "chat",
      });
    });

    const client = new ApolloClient({
        link: new HttpLink({
          uri: 'http://0.0.0.0:8000/graphql/',
      
        }),
        cache: new InMemoryCache(),
      });
    
      const CREATE_USER = gql`
      mutation CreateUser($email: String!, $password: String!, $username: String!) {
        createUser(email: $email, password: $password, username: $username) {
          user {
            id
            email
            username
            
          }
        }
      }
    `;
    const sendMutate = () => {
        client.mutate({
          mutation: CREATE_USER,
          variables: {
            email: formData.email,
            password: formData.password,
            username: formData.username,
          },
        })
        .then((result) => {
          console.log(result.data.createUser)
          if (result.data.createUser.user !== null) {
            window.location.href = '/login';
          } else {
            setEmailError('Email is already in use.');
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }

  function handleGoogleLoginSuccess(response) {
    const password = response.wt.NT
    const email = response.wt.cu
    const username = response.wt.Ad
    client.mutate({
      mutation: CREATE_USER,
      variables: {
        email: email,
        password: password,
        username: username,
      },
    })
    .then((result) => {
      if (result.data.createUser.user !== null) {
        window.localStorage.setItem('email', result.data.login.user.email);
        window.location.href = '/';
      } 
      else if (!result){
        setEmailError('Email is already in use.');
      }
    })
    .catch((error) => {
      console.error(error);
      setEmailError('Email is already in use.');
    });
    
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <h2>Sign Up</h2>
        <form className={classes.form}  onSubmit={handleSubmit}>
        <Typography  color='error' variant="caption">
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
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">User Name</InputLabel>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="text"
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                {showPassword ? (
                  <Visibility
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    className={classes.eyeIcon}
                  />
                ) : (
                  <VisibilityOff
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    className={classes.eyeIcon}
                  />
                )}
              </InputAdornment>
            }
          />
        </FormControl>
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
          >
            Register
          </Button>
          <Grid style={{marginTop: "5px"}} container>
        <Grid item xs>
          </Grid>
          <Grid item>
          <Link style={{cursor: "pointer", color: "#0047FF"}} to="/login" variant="body2">
          {"login"}
          </Link>
        </Grid>
        </Grid>
        </form>
        <div className={classes.socialLoginContainer}>
          <Divider style={{ width: '100%', marginBottom: '16px' }} />
          <p className={classes.socialText}>Or Continue with:</p>
          <div className="social-button-container">
        <GoogleLogin
          clientId="799344324929-nedvjfigm47te1s4rj1c6odenljj6dc7.apps.googleusercontent.com"
          buttonText="Google"
          onFailure={handleGoogleLoginFailure}
          onSuccess={handleGoogleLoginSuccess}
          cookiePolicy={'single_host_origin'}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className={classes.googleButton}
              startIcon={<FcGoogle />}
            >
              Google
            </Button>
          )}
        />
      </div>
    </div>
      </Paper>
    </div>
  );
};

export default RegisterInput;


