import React from 'react';

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@material-ui/core';

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

const ResetInput = ({token}) => {
  const classes = useStyles(); 
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("")


  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const client = new ApolloClient({
    link: new HttpLink({
      uri: 'http://0.0.0.0:8000/graphql/',
  
    }),
    cache: new InMemoryCache(),
  });

  const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePasswordMutation($token: String!, $newPassword: String!) {
    updatePassword(token: $token, newPassword: $newPassword) {
      success
    }
  }
`;
const sendMutate = () => {
    client
      .mutate({
        mutation: UPDATE_PASSWORD_MUTATION,
        variables: {
          newPassword: formData.password,
          token: token,
        },
      })
      .then((result) => {
        if (result.data.updatePassword.success === true) {
            window.location.href = "/login";
        } else {
          setEmailError("Tokens Expired, request reset.");
        }
      })
      .catch((error) => {
        setEmailError("Tokens Expired, request reset");
      });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      try {
        sendMutate()
      } 
      
      catch (err) {
        setEmailError('Token expired');
        window.location.href = '/password-reset';
      }
      } 
      
      else {
        setEmailError('Passwords do not match');
      }
  };
  
 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        
        <h2>Change Password</h2>
        <form className={classes.form}  onSubmit={handleSubmit}>
            <Typography  style={{color: '#0047FF'}} variant="caption">
            {emailError}
        </Typography>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">New Password</InputLabel>
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
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Confirm Password</InputLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                {showPassword ? (
                  <Visibility
                    onClick={handleConfirmClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    className={classes.eyeIcon}
                  />
                ) : (
                  <VisibilityOff
                    onClick={handleConfirmClickShowPassword}
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
            Reset
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

export default ResetInput;