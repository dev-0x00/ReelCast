import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import ProfilePic from '../assets/images/profile.jpeg';
import {AiFillEdit, AiTwotoneEdit} from 'react-icons/ai';
import {GiPaperPlane} from 'react-icons/gi';
import {HiOutlineLogout} from 'react-icons/hi';

import { Grid, useMediaQuery, Typography } from "@material-ui/core";
import {AiOutlineVideoCameraAdd, AiOutlineYoutube, AiOutlineCloudUpload} from 'react-icons/ai';
import {MdOutlineVideoLibrary} from 'react-icons/md';
import Logo from "../assets/logo/logo5.png"
import {  useLocation } from 'react-router-dom';


const drawerWidth = 230;
const drawerWidthSmall = 240;
const drawerWidthLarge = 320;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    border: '1px solid red',
    borderRadius: '5px',
    marginLeft: '280px',
    marginRight: '10px',
    marginTop: "40px",
    maxWidth: '100%',
    minHeight: 'calc(100vh - 90px)',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
      minHeight: '100%',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: "1000px",
    marginLeft: -drawerWidth,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },

  drawerPaper: {
    width: drawerWidth,
    border: "1px solid #0047FF",
    margin: "20px",
    borderRadius: '5px',
    height: "95% !important",
    
  },
  drawerContainer: {
    overflow: 'auto',
    paddingTop: theme.spacing(2),
    height: "95% !important",
    overflowX: "hidden"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  userProfile: {
    display: 'flex',
    flexDirection: 'center',
    alignItems: 'center',
    margin: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  userProfilePic: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginLeft: "-25px"
  },
  sidebarContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  bottomButtons: {
    position: "absolute",
    bottom: 0,
    margin: "10px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    
  },
  // styles for sidenav when height is small
  drawerSmall: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidthSmall,
      flexShrink: 0,
      marginTop: "20px",
      height: `calc(100% - 20px)`,
    },
  },
  // styles for sidenav when height is large
  drawerLarge: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidthLarge,
      flexShrink: 0,
      marginTop: "30px",
      height: `calc(100% - 30px)`,
    },

  },
  upgradeButton: {
    width: '100%',
    marginBottom: theme.spacing(1),
    background: "#DADCFF",
    border: "1px solid #0047FF",
  },

  editButton: {
    borderRadius: '5px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  editIcon: {
    fontSize: '.8rem',
    backgroundColor: 'transparent',
    marginTop: "-10px",
    '&:hover': {
        color: "#0047FF"
      },
  },
  Name: {
    alignContent: "center" ,
    justifyContent: "center" 

  },
  username: {
    fontFamily: "Lato"
  },

  buttonsList: {
    margin: "5px",
  },
  listText: {
    fontFamily: "Lato !important",
  },

  listButtons: {
    marginTop: "5px",
    borderRadius: "5px",
    '&:hover': {
        background: "#DADCFF"
  },
},

listButtonIcons: {
    marginLeft: "30px",
},
logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center"
  },
  
  logo: {
    height: 120,
    width: "120px",
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
}));

const Sidebar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const username = localStorage.getItem("username");
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");

  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState(location.pathname);

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = '/login';
  };

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(true);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen]);

  return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}>
            {!isSmallScreen && open &&(
                <div className={classes.logoContainer}>
                <img src={Logo} alt="Logo" className={classes.logo} />
              </div>
            )}
            
            {isSmallScreen && open && (
                <IconButton onClick={handleDrawerClose}>
                <MenuIcon />
                </IconButton>
            )}
            {isSmallScreen && !open && (
                <IconButton onClick={handleDrawerOpen}>
                <MenuIcon />
                </IconButton>
            )}
        </div>
        <Divider />
        <div className={classes.drawerContainer}>
        <Grid container direction="column" alignItems="center" className={classes.userProfile}>
            <img src={ProfilePic} alt="User profile" className={classes.userProfilePic} />
        <Grid container className={classes.Name}>
            <Typography className={classes.username}>{username}</Typography>
            <Grid item className={classes.userProfileEdit}>
            <IconButton className={classes.editButton}>
                 <AiTwotoneEdit  className={classes.editIcon}/>
            </IconButton>
            </Grid>
            </Grid>
        </Grid>
          <List className={classes.buttonsList}>
          <Divider style={{ marginBottom: '10px' }} />
            <ListItem className={classes.listButtons} button component={Link} to="/upload">
            <ListItemAvatar>
                <AiOutlineCloudUpload className={classes.listButtonIcons} />
            </ListItemAvatar>
              <ListItemText primary={<Typography variant="body1" className={classes.listText}>Upload video</Typography>} />
            </ListItem>

            <ListItem className={classes.listButtons} button component={Link} to="/videos">
              <ListItemIcon >
                <AiOutlineVideoCameraAdd className={classes.listButtonIcons} />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="body1" className={classes.listText}>My videos</Typography>} />
            </ListItem>
            
            <ListItem className={classes.listButtons} button component={Link} to="/shorts">
              <ListItemIcon>
              <AiOutlineYoutube className={classes.listButtonIcons}/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="body1" className={classes.listText}>My shorts</Typography>} />
            </ListItem>

            <ListItem className={classes.listButtons} button component={Link} to="/clips">
              <ListItemIcon>
              <MdOutlineVideoLibrary className={classes.listButtonIcons}/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="body1" className={classes.listText}>My clips</Typography>} />
            </ListItem>

            <ListItem className={classes.listButtons} button component={Link} to="/edits">
              <ListItemIcon>
              <AiFillEdit className={classes.listButtonIcons}/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="body1" className={classes.listText}>Edit videos</Typography>} />
            </ListItem>
      </List>
      <div className={classes.bottomButtons}>
      <Divider style={{ marginBottom: '10px' }} />
      <Button
        variant="outlined"
        color="primary"
        className={classes.upgradeButton}
        startIcon={<GiPaperPlane />}
        >
        Upgrade
        </Button>
        <Button
        onClick={handleLogout}
        variant="outlined"
        color="primary"
        className={classes.upgradeButton}
        startIcon={<HiOutlineLogout />}

        >
        Logout
        </Button>

      </div>
    </div>
  </Drawer>

);};
export default Sidebar