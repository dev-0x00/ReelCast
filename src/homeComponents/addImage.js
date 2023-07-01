import React, { useState, useEffect } from 'react';
import { Dialog,Grid,  GridList, GridListTile, Button, TextField, makeStyles, ImageListItem } from '@material-ui/core';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


const useStyles = makeStyles((theme) => ({
  gridList: {
    maxHeight: 900,
    maxWidth: 750,
    padding: "10px",
    
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: "grey",
      borderRadius: '2px',
    },
  },
  dialog: {
    border: '1px solid #0047FF',
    overflow: 'scroll',
  },
  tile: {
    cursor: 'pointer',
  },
  buttonSht: {
    background: "white",
    color:  "#0047FF",
    border: "1px solid #0047FF",
    height: "50px",
    textTransform: "none",
    fontSize: "1rem",
    borderRadius: "5px",
    marginLeft: "2%",
    fontFamily: "Lato",
    width: "150px",
    marginTop: "10px",
    marginBottom: "10px",
    
    '&:hover': {
      background: "#DADCFF",
      color: "black"
    },
    [theme.breakpoints.down(768)]: {
      width : "400px"
    },
    buttonRow: {
        marginTop: "10px !important",
        display: 'flex',
        justifyContent: 'flex-end',
        marginLeft: "10%",
     },
  },
}));

const ImageSelector = ({open, handleTileClick, handleClose}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const classes = useStyles();
  const [images, setImages] = useState([])
  const email = localStorage.getItem("email")

  const client = new ApolloClient({
    uri: "http://0.0.0.0:8000/graphql/",
    cache: new InMemoryCache(),
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const  getImages = () => {
    const GET_IMAGES_QUERY = gql`
    mutation GetImagesMutation($email: String!) {
      getImages(email: $email) {
        success
        images
      }
    }
  `;
    client
    .mutate({
      mutation: GET_IMAGES_QUERY,
      variables: {
        email: email,
      }
    })
    .then((result) => {
      console.log(result.data.getImages.images)
      if (result === null){
        setImages([]);
      } 
      
      else {
        const parsedImages = result.data.getImages.images.map((image) => JSON.parse(image));
        setImages(parsedImages);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

    getImages();
  }, []);
  

  return (
    <Dialog className="dialog" open={open} onClose={handleClose} PaperProps={{
        style: {
          overflowX: 'hidden',
          overflowY: 'hidden',
          border: "1px solid #0047FF"
        },
      }}>
      <GridList cellHeight={100} cols={3} className={classes.gridList}>
        {images && images.map((image) => (
          <ImageListItem key={image.id} className="tile" onClick={() => handleTileClick(image)}>
            <img src={image.urls.small} alt={image.id} height={image.height}  style={{ objectFit: 'cover', width: '100%', height: '100%' }}/>
          </ImageListItem>
        ))}
      </GridList>
    </Dialog>
  );
};

export default ImageSelector;


