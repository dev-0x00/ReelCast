import { useState, useEffect } from "react";
import { Skeleton } from "@material-ui/lab";
import {useNavigate} from 'react-router-dom';

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
} from "@material-ui/core";
import {Box} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import { MoreVert } from "@material-ui/icons";
import {MdOutlineVideoLibrary} from "react-icons/md";
import {AiFillEdit, AiFillDelete, AiOutlineYoutube} from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    height: "auto",
    marginBottom: "5px",
    boxShadow: "none"
  },
  
  No: {
    fontFamily: "Lato",
    color: "#0047FF"
  },
  
  progress: {
    width: "20px",
    height: "20px",
    color: '#0047FF',
    size: '.6rem !important',
  },
  
  media: {
    margin: "10px",
    height: "150px",
    width: "230px",
    borderRadius: "10px",
    background: "black",
  },
  
  status: { 
    border: "1px solid #0047FF",
    marginLeft: "auto",
    padding: "5px",
    borderRadius: "5px"
  },
  
  desc: {
    fontFamily: "Lato",
    textAlign: "left",
    padding: "10px",
    marginLeft: "-380px !important"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
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
        color: "#1a237e"
      },
    },
    "& .MuiMenuItem-root": {
      "&:hover": {
        background: "#DADCFF",
        color: "white",
        borderRadius: "5px",   
        marginRight: "5%"
      },
    },
  },
  
  listicon: {
    color: "#0047FF",
  },
  listitem :{
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
  },

  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  dot: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    height: "8px",
    width: "8px",
    marginRight: "4px",
    animation: `$bounce 1s ${theme.transitions.easing.easeInOut} infinite`,
  },
  dot1: {
    animationDelay: "0ms",
  },
  dot2: {
    animationDelay: "250ms",
  },
  dot3: {
    animationDelay: "500ms",
  },
  "@keyframes bounce": {
    "0%, 80%, 100%": {
      transform: "scale(0)",
    },
    "40%": {
      transform: "scale(1)",
    },
  },
  
}));

const ClipsCard = ({ setVideoTitle}) => {
  const classes = useStyles();
  const [anchorEls, setAnchorEls] = useState([]);
  const [videos, setVideos] = useState([]);
  const email = localStorage.getItem("email")
  const navigate = useNavigate();
  useEffect(() => {
    const client = new ApolloClient({
      uri: 'http://0.0.0.0:8000/graphql/',
      cache: new InMemoryCache()
    });
  
    const GET_VIDEOS_QUERY = gql`
      mutation GetVideo($email: String!, $option: String!){
        getVideos (email: $email, option: $option){
          success
          videos 
        }
      }
    `;
  
    client
      .mutate({
        mutation: GET_VIDEOS_QUERY,
        variables: {
          email:  email,
          option: "videos"
        }
      })
      .then((result) => {
        if (result.data.getVideos === null){
          setVideos([])
        }
        const videos = result.data.getVideos.videos.map(video => JSON.parse(video));
        console.log(videos);
        setVideos(videos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

function deleteVideo(title){
  const client = new ApolloClient({
    uri: 'http://0.0.0.0:8000/graphql/',
    cache: new InMemoryCache()
  });

  const DELETE_VIDEO_QUERY = gql`
    mutation DeleteVideos($email: String!, $title: String!){
      deleteVideo(email: $email, title: $title){
        success
        videos 
      }
    }
  `;

  console.log(title)
  client
    .mutate({
      mutation: DELETE_VIDEO_QUERY,
      variables: {
        email:  email,
        title: title
      }
    })
    .then((result) => {
      const videos = result.data.deleteVideo.videos.map(video => JSON.parse(video));
      setVideos(videos);
    })
    .catch((error) => {
      console.log(error);
    })
  };


const handleMenuOpen = (event, index) => {
  const newAnchorEls = [...anchorEls];
  newAnchorEls[index] = event.currentTarget;
  setAnchorEls(newAnchorEls);
};

const handleMenuClose = (index) => {
  const newAnchorEls = [...anchorEls];
  newAnchorEls[index] = null;
  setAnchorEls(newAnchorEls);
};

  const handleEdit = (title, gptres) => {
    // your code to handle the Edit button click
    setVideoTitle(title)
    localStorage.setItem("title", title)
    localStorage.setItem("gptres", gptres) 
    navigate("/edits");
  }
  
  const handleShorts = (title) => {
    // your code to handle the Shorts button click
    setVideoTitle(title)
    localStorage.setItem("title", title)
    navigate("/shorts");
  }
  const handleClips = (title) => {
    // your code to handle the Shorts button click
    setVideoTitle(title)
    localStorage.setItem("title", title)
    navigate("/clips");
  }
  

  return (
    <div>
      {videos && videos.length > 0 ? (
        videos.map((video, index) => (
          <Card key={video.id} className={classes.root}>
            <Grid container direction="row">
              {video.status === "Downloaded" ? (
                <Grid item xs={12} md={6}>
                  <CardMedia
                    className={classes.media}
                    component="video"
                    src={video.url}
                    title={video.title}
                    controls
                  />
                </Grid>
              ) : (
                <Grid item xs={12} md={6}>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    src={video.thumbnail}
                    title={video.video_title}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={4} className={classes.desc}container direction="column" justify="space-between">
                <Box p={1} >
                  <Typography style={{
                    fontFamily: "Lato",
                    fontSize: "1.2rem",
                    opacity: "3rem"
                  }} gutterBottom variant="h4" component="h2">
                    {video.title.split("_").filter((word) => word !== "mp4").slice(0, 4).join(" ")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Now to do that just run Django Admin Start project on my site., Where my site can be 
                    the name of the project that you want to run., I want to create basically., " 
                    Now a new folder will be created in that directory where you 
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
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Menu
              className={classes.menu}
              anchorEl={anchorEls[index]}
              open={Boolean(anchorEls[index])}
              onClose={() => handleMenuClose(index)}
            >
              <MenuItem onClick={() => handleEdit(video.title, video.gpt_url)}>
                <ListItemIcon className={classes.listicon}>
                  <AiFillEdit />
                </ListItemIcon>
                <ListItemText className={classes.listitem} primary="Edit" />
              </MenuItem>
              <MenuItem onClick={() => handleShorts(video.title)}>
                <ListItemIcon className={classes.listicon}>
                  <AiOutlineYoutube />
                </ListItemIcon>
                <ListItemText className={classes.listitem} primary="Shorts" />
              </MenuItem>
              <MenuItem onClick={() => handleClips(video.title)}>
                <ListItemIcon className={classes.listicon}>
                  <MdOutlineVideoLibrary />
                </ListItemIcon>
                <ListItemText className={classes.listitem} primary="Clips" />
              </MenuItem>
              <MenuItem onClick={() => deleteVideo(video.title)}>
                <ListItemIcon className={classes.listicon}>
                  <AiFillDelete />
                </ListItemIcon>
                <ListItemText className={classes.listitem} primary="Delete" variant="button" />
              </MenuItem>
            </Menu>
          </Card>
        ))
      ) : (
        <Typography className={classes.No}>No videos available</Typography>
      )}
    </div>
  );
};    
export default ClipsCard;