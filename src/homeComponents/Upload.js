import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Input,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";

import { ApolloClient, InMemoryCache } from "apollo-boost";
import { gql } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
    width: "80% !important",

    [theme.breakpoints.up('sm')]: {
        marginTop: "10%"
      },

      [theme.breakpoints.down('sm')]: {
        marginLeft: "10%"
      },


  },

  Holder: {
    marginLeft: 0,
  },

  formControl: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1%",
    marginBottom: "1%",
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  startHedaer: {
    color: "#120596",
    fontWeight: "bold",
    fontFamily: "Lato",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      fontSize: "2.8rem"
    },
    
  },
  input: {
    marginBottom: "20px",
    marginRight: "10px",
    marginTop: "20px",
    marginBottom: "50px",
    height: "20px",
    width: "140% !important",
    marginLeft: "-20%"
  },

  button: {
    marginRight: "10px",
    height: "50px",
    color: "#0047FF",
    border: "1px solid #0047FF",
    background: "white",  
    textTransform: "none",
    fontFamily: "Lato",
    width: "130px",
    
    '&:hover': {
      background: "#DADCFF",
      color: "white"
    },

  },

  link: {
    color: "#0047FF", // Replace with your desired color
    textDecoration: "underline",
    marginLeft: "5px",
    marginRight: "5px",
  },
}));

const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://0.0.0.0:8000/graphql/",
  }),
  cache: new InMemoryCache(),
});

const YOUTUBE_URL = gql`
  mutation CreateVideoMutation($url: String!, $fileType: String!, $email: String!) {
    youtubeVideo(url: $url, fileType: $fileType, email: $email) {
      response 
    }
  }
`;

const VideoUploader = () => {
  const classes = useStyles();
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [inputType, setInputType] = useState("url");

  function handleCreateClick() {
    setInputType('url')
  }
  useEffect(() => {
    handleCreateClick();
  }, []);

  function handleFileSelect(event) {
    const file = event.target.files[0];
    setFile(file);

    if (!file) {
      console.log("No file selected");
      return;
    }
    setInputType("file");
    setUrl(file.name)
  }

  const handleCreateButton = async (event) => {
    if (inputType === "url") {
      try {
        const email = localStorage.getItem("email");
        await client.mutate({
          mutation: YOUTUBE_URL,
          variables: {
            url: url,
            fileType: "videos",
            email: email
          }
        })
          .then((data) => {
            if (data) {
              
            } else {
              console.log("File upload failed");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    
    else if (inputType === "file") {
      console.log(file);
      const formData = new FormData();
      const email = localStorage.getItem("email");
      formData.append("file", file);
      formData.append("fileType", "videos");
      formData.append("email", email);

      fetch("http://38.242.208.87:8000/handle_file_upload/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("File uploaded successfully");
          } else {
            console.log("File upload failed");
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <div className={classes.root}>
    
     <form  className={classes.formControl}>
        <Typography className={classes.startHedaer}
        variant="h2">Quickest youtube video <br />shorts maker</Typography>
        <Typography style={{
        marginTop: "2%",
        color: "black",
        fontFamily: "Lato",
        textAlign: "center",
    }}
        variant="h6">Unleash your creativity with every shorts
         - Create , Edit and share with <br /> ease using out YouTube Video Shorts software</Typography>

         <Grid container spacing={0} alignItems="center" direction="column">
            <Grid item xs={12} sm={6}>
                <TextField
                id="videoTitle"
                label="Video Url"
                placeholder="Paste your youtube link here."
                variant="outlined"
                className={classes.input}
                value={url}   
                onChange={(e) => setUrl(e.target.value)} 
                onClick={handleCreateClick}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container className={classes.Holder} direction="row">
                <Grid item>
                    <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    className={classes.button}
                    onClick={handleCreateButton}
                    >
                    Create
                    </Button>
                </Grid>
                <Grid item>
                    <label htmlFor="fileInput">
                    <Button 
                        variant="contained"
                        color="secondary"
                        component="span"
                        className={classes.button}
                    >
                        Upload Locally
                        <Input
                        type="file"
                        accept="video/*"
                        onChange={handleFileSelect}
                        id="fileInput"
                        style={{ display: "none" }}
                        />
                    </Button>
                    </label>
                </Grid>
                </Grid>
            </Grid>
            </Grid>

            <Typography style={{ marginTop: '3%',marginLeft: "0%", color: 'dark' , justifyContent: "center",
        alignItems: "center",
        textAlign: "center",}} variant="h7">
                By using our service you accept our{' '}
                <Link href="#" className={classes.link}>
                    terms of service
                </Link>{' '}
                and{' '}
                <Link href="#" className={classes.link}>
                    policy of service
                </Link>
        </Typography>
        
      </form>
      
    </div>
  );
};

export default VideoUploader;
