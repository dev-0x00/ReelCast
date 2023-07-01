import { useState } from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    transcript: {
    textAlign: "left",
    paddingLeft: "10px",
    marginTop: "10px",
    height: "450.2px",
    border: "none",
    boxShadow: "none",
    overflowY: "scroll",
    fontFamily: "Lato",
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
      height: "380px",
    },

  }

}))

const TranscriptCard = ({ transcript, onSelect }) => {

  const classes = useStyles();
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);

  const handleMouseDown = (start) => {
    setSelectedStart(start);
    setSelectedEnd(start);
  };
  
  const handleMouseUp = (end) => {
    setSelectedEnd(end);
    onSelect(selectedStart, end);
  };
  
  const handleMouseMove = (event, start, end) => {
    if (event.buttons === 1) {
      setSelectedEnd(end);
    }
  };
  
  return (
    <Card>
      <CardContent className={classes.transcript}>
        <Typography style={{

        }}variant="h6">Transcript</Typography>
        <Typography component="p" style={{ whiteSpace: "pre-wrap" }}>
          {transcript.map((item, index) => (
            <span
              key={index}
              onMouseDown={() => handleMouseDown(item.start)}
              onMouseUp={() => handleMouseUp(item.end)}
              onMouseMove={(event) => handleMouseMove(event, selectedStart, item.end)}
              style={{
                backgroundColor:
                  item.start >= selectedStart && item.end <= selectedEnd
                    ? "#FFFF00"
                    : "inherit",
                cursor: "pointer",
              }}
            >
              {item.word}{" "}
            </span>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TranscriptCard;
