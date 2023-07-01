import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import Sidebar from './SideNav';
import VideoUploader from '../homeComponents/Upload';
import VideoCard from '../homeComponents/Videos';
import ShortsCard from '../homeComponents/Shorts';
import ClipsCard from '../homeComponents/Clips';
import VideoEditor from '../homeComponents/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: '5px',
    marginLeft: "280px",
    marginRight: '10px',
    marginTop: "40px",
    maxWidth: '100%',
    minHeight: 'calc(100vh - 90px)',
    transition: 'margin-left 0.3s ease-in-out', // Add transition effect

    [theme.breakpoints.down('sm')]: {
      marginLeft: '0'
    },
  }


}));

const HomeWithSidebar = () => {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const [videoTitle, setVideoTitle] =  useState(""); 

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  const classes = useStyles(); // Pass isopen as a prop to useStyles

  return (
    <>
      <Sidebar/>
      <div className={classes.root}>
        {currentRoute === "/"          &&  <VideoUploader/>}
        {currentRoute === "/upload"    &&  <VideoUploader/>}
        {currentRoute === "/videos"    &&  <VideoCard setVideoTitle={setVideoTitle} />}
        {currentRoute === "/shorts"    &&  <ShortsCard/>}
        {currentRoute === "/clips"     &&  <ClipsCard setVideoTitle={setVideoTitle} />}
        {currentRoute === "/edits"     &&  <VideoEditor  />}
      </div>
    </>
  );
};

export default HomeWithSidebar;

