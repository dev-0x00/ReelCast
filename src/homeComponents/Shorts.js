import { useState, useEffect } from "react";
import {
  Card,
  Button,
  CardMedia,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Box
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Skeleton } from "@material-ui/lab";

import { MoreVert } from "@material-ui/icons";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { HiDownload } from "react-icons/hi";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    height: "240px",
    borderRadius: "10px",
    marginTop: "0px",
    marginBottom: "-17Px",
    marginLeft: "0px",
    boxShadow: "none",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
  No: {
    fontFamily: "Lato",
    color: "#0047FF",
  },
  media: {
    height: "210px",
    width: "120px",
    borderRadius: "10px",
    marginLeft: "10px",
    background: "black",
    marginTop: "15px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      width: "100%",
      marginLeft: "0px",
    },
  },

  status: {
    border: "1px solid #0047FF",
    marginLeft: "auto",
    padding: "5px",
    borderRadius: "5px",
  },
  desc: {
    marginTop: "-13.7%",
    width: "40%",
    justifyContent: "right",
    marginLeft: "11%",
    textAlign: "left",
    border: "none",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "5%",
      marginLeft: "0px",
    },
  },
  upload: {
    marginTop: "1%",
    width: "41.5%",
    border: "1px solid blue",
    justifyContent: "right",
    marginLeft: "17%",
    textAlign: "left",
    background: "#DADCFF",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: "0px",
    },
  },
  thumbnail: {
    height: "30px",
    width: "50px",
    margin: "2px",
    marginBottom: "-35px",
  },

  uploadIcon: {
    display: "flex",
    alignItems: "right",
    justifyContent: "right",
    flexDirection: "column",
    marginTop: "-6%",
    marginLeft: "90%",
    color: "#0047FF",
    "&:hover": {
      color: "#1a237e",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "80%",
    },
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menu: {
    marginTop: "2%",
    borderRadius: "5px",
    marginRight: "3%",
    "& .MuiList-root": {
      background: "white",
      width: "200px",
      color: theme.palette.primary.primary,
      borderRadius: "5px",
      marginLeft: "3%",
      "&:hover": {
        color: "#1a237e",
      },
    },
    "& .MuiMenuItem-root": {
      "&:hover": {
        background: "#DADCFF",
        color: "white",
        borderRadius: "5px",
        marginRight: "5%",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: "0px",
      "& .MuiList-root": {
        width: "100%",
        marginLeft: "0px",
      },
    },
  },

  listicon: {
    color: "#0047FF",
  },
  listitem: {
    color: "#0047FF",
    "&:hover": {
      color: "#1a237e",
    },
  },
  button: {
    color: "#0047FF",
    "&:hover": {
      color: "#1a237e",
    },
  }
}));

const ShortsCard = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [videos, setVideos] = useState([]);
  const email = localStorage.getItem("email")
  const title = localStorage.getItem("title")

  useEffect(() => {
    setAnchorEl(videos.map(() => null));
  }, [videos]);
  
  const handleMenuOpen = (event, index) => {
    event.stopPropagation();
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };
  
  const handleMenuClose = (index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };
  

  useEffect(() => {
    const client = new ApolloClient({
      uri: 'http://0.0.0.0:8000/graphql/',
      cache: new InMemoryCache()
    });
  
    const GET_VIDEOS_QUERY = gql`
      mutation GetShortsMutation($email: String!, $title: String!){
        getShorts (email: $email, title: $title){
          success
          videos 
        }
      }
    `;
  
    client
      .mutate({
        mutation: GET_VIDEOS_QUERY,
        variables: {
          email: email,
          title: !title ? "All" : title
        }
      })
      .then((result) => {
        const videos = result.data.getShorts.videos.map(video => JSON.parse(video));
        setVideos(videos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Grid container direction="column" spacing={3}>
        {videos.length > 0 ?  videos.map((video, index ) => (
          <Grid item key={video.id}>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                component="video"
                src={video.url}
                title={video.title}
                controls
              />
              <Grid item xs={12} md={4} className={classes.desc}container direction="column" justify="space-between">
                <Box p={1} >
                  <Typography style={{
                    fontFamily: "Lato",
                    fontSize: "1.2rem",
                    opacity: "3rem"
                  }} gutterBottom variant="h4" component="h2">
                    {video.title && video.title.split("_").filter((word) => word !== "mp4").slice(0, 4).join(" ")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                   {video.description}
                  </Typography>
                </Box>
                <Box p={2}>
                  <Grid container className={classes.status} alignItems="center" justify="space-between">
                    <Typography variant="subtitle1" component="h3">
                      {video.status === "Downloaded" ? "Downloaded" : 
                      
                      <div className={classes.loading}>
                        <Skeleton variant="circle" className={`${classes.dot} ${classes.dot1}`} />
                        <Skeleton variant="circle" className={`${classes.dot} ${classes.dot2}`} />
                        <Skeleton variant="circle" className={`${classes.dot} ${classes.dot3}`} />
                      </div>}
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                      {video.uploaded}
                    </Typography>
                    <Button className={classes.button} onClick={(event) => handleMenuOpen(event, index)}>
                      <MoreVert />
                    </Button>
                    <Menu
                            className={classes.menu}
                            anchorEl={anchorEl[index]}
                            open={Boolean(anchorEl[index])}
                            onClose={() => handleMenuClose(index)}
                        >
                        <MenuItem >
                            <ListItemIcon className={classes.listicon}>
                            <HiDownload />
                            </ListItemIcon>
                            <ListItemText className={classes.listitem} primary="Download" />
                        </MenuItem>
                        <MenuItem >
                            <ListItemIcon className={classes.listicon}>
                            <AiFillEdit />
                            </ListItemIcon>
                            <ListItemText className={classes.listitem} primary="Edit" />
                        </MenuItem>
                        <MenuItem >
                            <ListItemIcon className={classes.listicon}>
                            <AiFillDelete />
                            </ListItemIcon>
                            <ListItemText className={classes.listitem} primary="Delete" variant="button" />
                        </MenuItem>
                        </Menu>
                  </Grid>
                </Box>
              </Grid>
              </Card>
            </Grid>
        )) : 
        <Typography className={classes.No}>
          No Video selected
       </Typography>
       }
      </Grid>
    </div>
  );
        

}  
export default ShortsCard;
