import React ,{ useState, useEffect}from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Logo from "../assets/logo/logo7.png"
import LoginInput from '../authentication/loginInput';
import RegisterInput from "../authentication/registerInput"
import ForgetInput from "../authentication/forgetpas"
import ResetInput from "../authentication/reset"
import Bimage from "../assets/images/background2.jpg"
import {  useLocation } from 'react-router-dom';


import {
  Typography
  
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    
    [theme.breakpoints.down('sm')]: {
      height: '100vh',
      paddingBottom: theme.spacing(4),
    },
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '35%',
    height: "100%",
    padding: 0,
    backgroundImage: `url(${Bimage})`,
    margin: '0', // center horizontally
    borderRadius: "7px",
    
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'none',
      height: "100%",
      padding: theme.spacing(2),
      borderRadius: "0px",
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  
  logo: {
    height: 100,
  },

  title: {
    fontSize: '2rem',
    color: 'white',
    marginBottom: 0,
    fontFamily: 'Lato',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },

  subtitle: {
    fontSize: '.75rem',
    color: 'white',
    marginBottom: 0,
    marginLeft: theme.spacing(1),
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '.6rem',
    },
  },

  Head: {
    fontSize: '1.8rem',
    color: 'white',
    fontFamily: 'Lato',
    alignItems: 'center',
    textAlign: 'center',
    padding: "10px",

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },

    [theme.breakpoints.up('xl')]: {
      fontSize: '2.5rem',
    },
  },
  
  introText: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    color: 'white',
    fontFamily: 'Lato',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '1.0rem',
    marginRight: "10px",
    marginLeft: "10px",
    marginBotton: "20px",
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      marginBottom: "20px ",
    },

    [theme.breakpoints.up('xl')]: {
      marginRight: "50px",
      marginLeft: "50px",
    },
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  button: {
    fontFamily: "Lato",
    border: "1px solid #0047FF",
    color: "#0047FF",
    '&:hover': {
      backgroundColor: '#F4F4F4',
    },
  },
  termsContainer: {
    textAlign: 'center',
    color: 'white',
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.1rem',
    },
  },

  termsText: {
    color: 'white',
    fontFamily: "Lato",
    '& a': {
      color: "#0047FF",
      textDecoration: 'underline',
    },
  },
  
}));

const Login = () => {
  const classes = useStyles();

  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  return (
    <div className={classes.loginContainer}>
      <div className={classes.leftContainer}>
        <div className={classes.logoContainer}>
          <img src={Logo} alt="Logo" className={classes.logo} />
          <div>
            <Typography variant="h2" className={classes.title}>Clipwave</Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>software</Typography>
          </div>
        </div>
        <Typography variant="subtitle1" className={classes.Head}>The quickest YouTube  video <br/> shorts maker</Typography>
        <Typography variant="body1" className={classes.introText}>
          With Clipwave, you can create more content in less time and focus on producing high-quality videos. Say goodbye to the headache of video editing and streamline your workflow with Clipwave. Unleash your creativity with every shorts - Create, Edit, and Share with ease using our YouTube Video Shorts software.
        </Typography>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} variant="contained">Get started for free</Button>
        </div>
        <Typography variant="body2" className={classes.termsText}>
          By signing up, you accept our <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Policy</Link>.
        </Typography>
      </div>
      <div className={classes.rightContainer}>
        {currentRoute === '/login' && <LoginInput />}
        {currentRoute === '/register' && <RegisterInput />}
        {currentRoute === '/password-reset' && <ForgetInput /> }
        {token && <ResetInput token={token}/> }
      </div>
    </div>
  );
};

export default Login;