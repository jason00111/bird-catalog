import React, { Dispatch, SetStateAction } from "react";
import { Chip, createStyles, Fade, Grid, makeStyles } from "@material-ui/core";
import { Bird } from "../../../common/types";
import { SyncWithDB, Tags } from "../App";
import EditTags from "./EditTags";

const useStyles = makeStyles((theme) =>
  createStyles({
    img: {
      width: "100%",
      display: "block",
    },
    gridItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
    },
    imageContainer: {
      position: "relative",
    },
    tagsContainer: {
      "& > *": {
        margin: theme.spacing(0.2),
      },
      position: "absolute",
      left: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(1),
    },
  })
);

interface BirdGridItemProps {
  bird: Bird;
  allTags: Tags;
  setAllTags: Dispatch<SetStateAction<Tags>>;
  syncWithDB: SyncWithDB;
  showTags: boolean;
  setShowTags: Dispatch<SetStateAction<boolean>>;
}

function BirdGridItem({
  bird,
  allTags,
  setAllTags,
  syncWithDB,
  showTags,
  setShowTags,
}: BirdGridItemProps) {
  function handleClick() {
    setShowTags((prevShowTags) => !prevShowTags);
  }

  const classes = useStyles();

  return (
    <Grid item key={bird.id} sm={12} md={6} className={classes.gridItem}>
      <div className={classes.imageContainer}>
        <img
          src={bird.img}
          className={classes.img}
          onClick={handleClick}
          alt={bird.tags.join(" ")}
        />
        <Fade in={showTags}>
          <div className={classes.tagsContainer}>
            <EditTags
              bird={bird}
              allTags={allTags}
              syncWithDB={syncWithDB}
              setAllTags={setAllTags}
            />
            {bird.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </div>
        </Fade>
      </div>
    </Grid>
  );
}

export default BirdGridItem;
