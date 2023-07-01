import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Typography,
  InputBase,
  TextField,
  Menu,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"; 
import DeleteIcon from "@material-ui/icons/Delete";
import { AiOutlineUpload } from "react-icons/ai";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
    holder: {
        height: "320px"
    },
    media: {
      borderRadius: "10px",
      background: "black",
      height: "auto",
      width: "auto",
      
      [theme.breakpoints.up("xl")]: {
        height: "320px",
        maxWidth: "18%",
      },
    },
    
    inputGrid:  {
        [theme.breakpoints.up("xl")]: {
            width: "80%",
            marginLeft: "17%",
            marginTop: "-20%",
            marginBottom: "10px"
            
          },
  
   
    },

    button: {
      background: "white",
      border: "1px solid #0047FF",
      height: "50px",
      color: "#0047FF",
      marginRight: "10px",
      borderRadius: "10px",
      '&:hover': {
        background: "#DADCFF",
        color: "black"
      },
      [theme.breakpoints.up("xl")]: {
        height: "56px",
       
      },

      [theme.breakpoints.up("lg")]: {
       
        
      },
    },
    
    Colorbutton: {
        background: "#D9D9D9",
        height: "40px",
        color: "#0047FF",
        marginRight: "10px",
        borderRadius: "5px",
        '&:hover': {
            background: "#DADCFF",  
        },
        [theme.breakpoints.up("md")]: {
         paddingRight: "px"
          
        },
        '& input[type="color"]::-webkit-color-swatch': {
            width: '40px',
            height: '20px',
            borderRadius: "5px",
            marginTop: "-5px",
            color: "blue",
            marginRight: "0%"
          },
      },
      

    inputField: {
        background: "white",
        boxShadow: "none",
        width: "60%",
        borderRadius: "10px",
        '&:hover': {
          background: "white",
          color: "white"
        },
        [theme.breakpoints.up("xl")]: {
            width: "60%",
            marginLeft: "-5%",
            marginRight: "30px",
            height: "56px"
           
          },
    
          [theme.breakpoints.up("lg")]: {
            width: "60%",
            marginLeft: "-5%",
            marginRight: "30px",
            height: "56px"
            
          },

          [theme.breakpoints.down("md")]: {
            width: "52%",
            marginLeft: "-5%",
            marginRight: "30px",
            height: "56px"
           
          },
      },

    Holder: {
        width: "0%",
        boxShadow: "none",
        [theme.breakpoints.up("xl")]: {
            width: "80%",
            marginLeft: "13%",
            mariginTop: "20px"
           
          },
    
        
      },
    
    caption: {
        fontFamily : "Lato",
        fontWeight: "bold",
        marginBottom: "5px", 
        [theme.breakpoints.up("xl")]: {
            marginLeft: "0%"
           
          },
   

      },

    paragraph: {
        fontFamily : "Lato",
        opacity: 0.5, 
        boxShadow: "none",
        border: "none",
        [theme.breakpoints.up("xl")]: {
           width: "80%",
           textAlign: "left",
           marginLeft: "5px"
           
          },

      },

    buttonSht: {
      background: "white",
      color:  "#0047FF",
      border: "2px solid #0047FF",
      height: "50px",
      borderRadius: "10px",
      marginLeft: "1%",
      fontFamily: "Helvetica",
      '&:hover': {
        background: "#DADCFF",
        color: "white"
      },
      [theme.breakpoints.down(768)]: {
        width : "300px"
      },
    },

  }));  
  

    const ShortsEdior = () => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [currentAlignment, setCurrentAlignment] = useState("Bottom");
    const [currentSize, setCurrentSize] = useState("Medium");
    const [currentStyle, setCurrentStyle] = useState("Sans");
    

    const [videos, setVideos] = useState([]);
    const email = localStorage.getItem("email")
    const title = localStorage.getItem("title")

    const handleClick = (event, anchor) => {  
        setAnchorEl(event.currentTarget);      
            
    };

    const handleClick1 = (event, anchor) => {  
        setAnchorEl1(event.currentTarget);      
            
    };
    const handleClick2 = (event, anchor) => {  
        setAnchorEl2(event.currentTarget);      
            
    };

    const handleClose = (anchor) => {
        switch (anchor) {
            case 'anchorEl':
                setAnchorEl(null);
                break;
            case 'anchorEl1':
                setAnchorEl1(null);
                break;
            case 'anchorEl2':
                setAnchorEl2(null);
                break;
            default:
                break;
        }
    };

    const handleAlignmentClick = (alignment, anchor) => {
        handleClose(anchor);
        setCurrentAlignment(alignment);
    };
    const fontSize = (size, anchor) => {
        handleClose(anchor);
        setCurrentSize(size);
    };
    const fontStyle = (style, anchor) => {
        handleClose(anchor);
        setCurrentStyle(style);
    };

    useEffect(() => {
      const client = new ApolloClient({
        uri: 'http://38.242.208.877:8000/graphql/',
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
            title: title
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
        {videos.map((video, index) => (
        <CardContent className={classes.holder}>
       
            <Grid  item>
            <CardMedia
                className={classes.media}
                component="video"
                src={video.url}
                title={video.title}
                controls
                />
            </Grid>
            <Grid  className={classes.inputGrid} >
                <TextField
                id="shortTitle"
                label={video.title}
                variant="outlined"
                className={classes.inputField}/>
                <Button className={classes.button}>Save </Button>
                <Button className={classes.button}><DeleteIcon /></Button>
            </Grid>

            <Card className={classes.Holder}>
                <Typography className={classes.caption} variant="body2" component="p">
                    Caption
                </Typography>
                <Grid container direction="row" alignItems="center">
                    <Grid container direction="column" style={{width: "8%"}}>
                        <Typography className={classes.title}
                         style={{
                            color: "#000", 
                            marginLeft: "5%",
                            fontSize: ".8rem",
                            opacity: 0.6,
                            }}>
                        Color
                        </Typography>
                        <Button className={classes.Colorbutton}> 
                        <InputBase type="color" >
                        </InputBase><ExpandMoreIcon/></Button>
                    </Grid>


                    <Grid container direction="column" style={{width: "8%"}}>
                        <Typography className={classes.title}
                         style={{
                            color: "#000", 
                            marginLeft: "5%",
                            fontSize: ".8rem",
                            opacity: 0.6,
                            }}>
                        Outline
                        </Typography>
                        <Button className={classes.Colorbutton}> 
                        <InputBase type="color" >
                        </InputBase><ExpandMoreIcon/></Button>
                    </Grid>
 
                    <Grid container direction="column" style={{width: "8%"}}>
                        <Typography className={classes.title}
                         style={{
                            color: "#000", 
                            marginLeft: "5%",
                            fontSize: ".8rem",
                            opacity: 0.6,
                            }}>
                        Alignment
                        </Typography>
                        <Button 
                            className={classes.Colorbutton}
                            aria-haspopup="true"
                            onClick={handleClick}> 
                        <InputBase type="dropdown" value={currentAlignment} className={classes.Colorbutton}>
                        </InputBase><ExpandMoreIcon/></Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => handleClose('anchorEl')}
                            >
                            <MenuItem onClick={() => handleAlignmentClick('Top', 'anchorEl')}>Top</MenuItem>
                            <MenuItem onClick={() => handleAlignmentClick('Center', 'anchorEl')}>Center</MenuItem>
                            <MenuItem onClick={() => handleAlignmentClick('Bottom', 'anchorEl')}>Bottom</MenuItem>
                        </Menu>
                    </Grid>

                    <Grid container direction="column" style={{width: "8%"}}>
                        <Typography className={classes.title}
                         style={{
                            color: "#000", 
                            marginLeft: "5%",
                            fontSize: ".8rem",
                            opacity: 0.6,
                            }}>
                        Font Size
                        </Typography>
                        <Button 
                            className={classes.Colorbutton}
                            aria-haspopup="true"
                            onClick={handleClick1}> 
                        <InputBase type="dropdown" value={currentSize} className={classes.Colorbutton}>
                        </InputBase><ExpandMoreIcon/></Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl1}
                            keepMounted
                            open={Boolean(anchorEl1)}
                            onClose={() => handleClose('anchorE1')}
                        >
                            <MenuItem onClick={() => fontSize("Large", 'anchorEl1')}>Large</MenuItem>
                            <MenuItem onClick={() => fontSize("Medium", 'anchorEl1')}>Medium</MenuItem>
                            <MenuItem onClick={() => fontSize("Small", 'anchorEl1')}>Small</MenuItem>
                        </Menu>
                    </Grid>

                    <Grid container direction="column" style={{width: "8%"}}>
                        <Typography className={classes.title}
                         style={{
                            color: "#000", 
                            marginLeft: "5%",
                            fontSize: ".8rem",
                            opacity: 0.6,
                            }}>
                        Font Style
                        </Typography>
                        <Button 
                            className={classes.Colorbutton}
                            aria-haspopup="true"
                            onClick={handleClick2}> 
                        <InputBase type="dropdown" value={currentStyle} className={classes.Colorbutton}>
                        </InputBase><ExpandMoreIcon/></Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl2}
                            keepMounted
                            open={Boolean(anchorEl2)}
                            onClose={() => handleClose('anchorEl2')}
                        >
                            <MenuItem onClick={() => fontStyle("Fs Pro Display", "anchorEl2")}>Fs pro Dospay</MenuItem>
                            <MenuItem onClick={() => fontStyle("Lato", "anchorEl2")}>Lato</MenuItem>
                            <MenuItem onClick={() => fontStyle("Sans", "anchorEl2")}>Sans</MenuItem>
                        </Menu>
                    </Grid>
                    <Grid container direction="column" style={{width: "8%"}}>
                        <Typography className={classes.title} style={{
                            fontSize: ".8rem",opacity: 0.6,color: "#000", marginLeft: "5%"}}>
                        thumbnail
                        </Typography>
                         <Button className={classes.Colorbutton}><AiOutlineUpload/></Button>
                    </Grid>   
                </Grid>
                <Grid item>
                <Typography className={classes.caption} >
                    Transcript
                </Typography>
                <Card style={{border: "none", boxShadow: "none"}} >
                <Typography className={classes.paragraph} >
                    {video.description != null ? video.description.split(' ').slice(0, 35).join(' '): "Video Title"}
                  </Typography>
                </Card>
                </Grid>
                <Grid >
                <Typography className={classes.caption}>
                    Reason
                </Typography>
                <Card style={{border: "none", boxShadow: "none"}} >
                <Typography className={classes.paragraph} >
                {video.description != null ? video.description.split(' ').slice(0, 35).join(' '): "Video Title"}
                  </Typography>
                    </Card>
                </Grid>
            </Card>
          </CardContent>
          ))}
    </div>
  );
};

export default ShortsEdior;
