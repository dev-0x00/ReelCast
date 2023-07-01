import React, { useState, useEffect } from "react";
import { GridList, GridListTile, TextField, Modal } from '@material-ui/core';

import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Typography,
  Box
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ShortsEdior from "./edit_shorts";
import ImageSelector from "./addImage";
import TranscriptCard from "./transcript";


const useStyles = makeStyles((theme) => ({
    container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gridGap: theme.spacing(2),
  },
  card: {
    Width: 500,
    border: 'none',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  No: {
    fontFamily: "Lato",
    color: "#0047FF"
  },
  media: {
    borderRadius: "10px",
    background: "black",
    maxWidth: "100%",
    maxHeight: "100%",

    [theme.breakpoints.up("lg")]: {
      width : "50%",
      hegiht: "400px !important",
      marginRight: "40px"
    },
  },
  button: {
    background: "white",
    border: "2px solid #0047FF",
    height: "50px",
    borderRadius: "10px",
    marginTop: "-6.25%",
    marginLeft: "1%",
    fontstyle: "Helvetica",
    '&:hover': {
      background: "#0047FF",
      color: "white"
    }
  },
  buttonSht: {
    background: "white",
    color:  "#0047FF",
    border: "1px solid #0047FF",
    height: "50px",
    textTransform: "none",
    fontSize: "2rem",
    borderRadius: "5px",
    marginLeft: "1%",
    fontFamily: "Lato",
    width: "150px",
    '&:hover': {
      background: "#DADCFF",
      color: "black"
    },
    [theme.breakpoints.down(768)]: {
      width : "400px"
    },
  },
  buttonIco: {
    background: "white",
    border: "2px solid #0047FF",
    height: "50px",
    borderRadius: "10px",
    marginTop: "-6.25%",
    marginLeft: "1%",
    color: "#0047FF",
    '&:hover': {
      background: "#0047FF",
      color: "white"
    }
  },
  buttonP: {
    background: "white",
    border: "2px solid #0047FF",
    height: "50px",
    borderRadius: "10px",
    marginTop: "-6.15%",
    marginLeft: "10%"
  },
  input: {
    background: "white",
    height: "50px",
    width: "50%",
    marginTop: "-32%",
    marginLeft: "20%"
  },
  input1: {
    background: "white",
    border: "2px solid grey",
    height: "50px",
    borderRadius: "10px",
    width: "100%",
    "&::placeholder": {
        color: "black",
        fontStyle: "Helvetica",
        fontWeight: 500,
        marginLeft: "5%",
        fontSize: "16px"
      },
    },
    selected: {
      border: "1px solid #0047FF",
      background: "#DADCFF",
      borderRadius: "5px"
    },

    select: {
      cursor: "pointer"
    },
    make: {
        color: "#0047FF",
        fontWeight: "bold",
        '&:hover': {
          color: "white",
          fontWeight: "bold",
        }
      },
    
      shorts: {
        width: "18%",
        height: "450px",
        borderRadius: "10px",
        background: "black",
        marginTop: "-.5%",
        marginLeft: "-82%"
      },
  
    transcript: {
      textAlign: "left",
      paddingLeft: "20px",
      marginTop: "10px",
      height: "440.2px",
      border: "none",
      boxShadow: "none",
      overflowY: "scroll",
      '&::-webkit-scrollbar': {
        width: "5px",
      },
      '&::-webkit-scrollbar-track': {
        background: "white",
      },
      '&::-webkit-scrollbar-thumb': {
        background: "#9F9F9F",
        borderRadius: "5px",
        '&:hover': {
          background: "blue",

        }
      },
      [theme.breakpoints.up("xl")]: {
        height: "350px",
        marginLeft: "2  0px",
      },

    },
    subtitleOptions: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
      border: '1px solid #ccc',
      borderRadius: 4,
    },
  }));  

  const VideoEditor = () => {
    const classes = useStyles();
    const [video, setVideo] = useState([]);
    const [transcript, setTranscript] = useState([]);
    const gptres = localStorage.getItem("gptres");
    const title = localStorage.getItem("title");
    const email = localStorage.getItem("email");
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)


    const [selectedImage, setSelectedImage] = useState(null);
    const [open, setOpen] = useState(false);
    
    const client = new ApolloClient({
      uri: "http://0.0.0.0:8000/graphql/",
      cache: new InMemoryCache(),
    });
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleSelect = (start, end) => {
      setStartTime(start)
      setEndTime(end)
    };
    const handleTileClick = (image) => {
      console.log("Selected image:", image);
      setSelectedImage(image);
      handleClose();
    };

    useEffect(() => {
      const EDIT_VIDEOS_QUERY = gql`
        mutation EditVideos($email: String!, $title: String!) {
          editVideo(email: $email, title: $title) {
            success
            videos
          }
        }
      `;
        
      if (gptres) {
        fetch(gptres)
          .then((response) => response.json())
          .then((data) => {
            const newTranscript = [];
            data.segments.forEach((segment) => {
              segment.words.forEach((word) => {
                newTranscript.push({
                  word: word.word,
                  start: word.start,
                  end: word.end,
                });
              });
            });
            setTranscript(newTranscript);
  
            client
              .mutate({
                mutation: EDIT_VIDEOS_QUERY,
                variables: {
                  email: email,
                  title: title
                }
              })
              .then((result) => {
                if (result.data.editVideo === null){
                  setVideo([]);
                } else {
                  const videos = result.data.editVideo.videos.map(video => JSON.parse(video));
                  setVideo(videos);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(error => {
            console.error('Error fetching JSON file:', error);
          });
      }
    }, [gptres, email, title]);

    
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Grid container direction="row">
              <CardMedia
                className={classes.media}
                component="video"
                src={video.length > 0 ? video[0].url : null}
                title={video.title}
                controls
              />
              <Grid item xs={12} md={12} lg={4}>
                <TranscriptCard transcript={transcript} onSelect={handleSelect}/>
                <Grid container spacing={1} style={{ marginLeft: "5%" , marginTop: "10px"}}>
                  <Grid item>
                    <Button className={classes.buttonSht}>
                      <Typography>Make Short</Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleOpen} className={classes.buttonSht}>
                      <Typography>Add Image</Typography>
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      <ImageSelector
                        open={open}
                        handleTileClick={handleTileClick}
                        handleClose={handleClose}
                      />
                    </Modal>
                  </Grid>
                  <Grid item>
                    <Box
                      flexDirection="column"
                      alignItems="center"
                      className={classes.buttonSht}
                      style={{ width: "150px" }}
                    >
                      <Typography
                        style={{ fontSize: ".9rem" }}
                        variant="subtitle1"
                      >
                        Start: {startTime}
                      </Typography>
                      <Typography
                        style={{ fontSize: ".9rem" }}
                        variant="subtitle1"
                      >
                        End : {endTime}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              </Grid>
          </CardContent>
          <ShortsEdior />
        </Card>
      </div>
    );
    
};

export default VideoEditor;
