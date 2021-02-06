import React, { Dispatch, SetStateAction, useState } from "react";
import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import { Bird } from "../../../common/types";
import { SyncWithDB, Tags } from "../App";
import BirdGridItem from "./BridGridItem";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "flex-start",
    },
  })
);

interface BirdsGridProps {
  birds: Bird[];
  allTags: Tags;
  setAllTags: Dispatch<SetStateAction<Tags>>;
  selectTag: (tag: string) => void;
  syncWithDB: SyncWithDB;
}

function BirdsGrid({
  birds,
  allTags,
  setAllTags,
  selectTag,
  syncWithDB,
}: BirdsGridProps) {
  const [showTags, setShowTags] = useState(true);

  const isSmallScreen: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {isSmallScreen ? (
        <Grid container spacing={0}>
          {birds.map((bird) => (
            <BirdGridItem
              key={bird.id}
              bird={bird}
              allTags={allTags}
              setAllTags={setAllTags}
              syncWithDB={syncWithDB}
              showTags={showTags}
              setShowTags={setShowTags}
              selectTag={selectTag}
            />
          ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={0}>
            {birds.slice(0, Math.ceil(birds.length / 2)).map((bird) => (
              <BirdGridItem
                key={bird.id}
                bird={bird}
                allTags={allTags}
                setAllTags={setAllTags}
                syncWithDB={syncWithDB}
                showTags={showTags}
                setShowTags={setShowTags}
                selectTag={selectTag}
              />
            ))}
          </Grid>
          <Grid container spacing={0}>
            {birds.slice(Math.ceil(birds.length / 2)).map((bird) => (
              <BirdGridItem
                key={bird.id}
                bird={bird}
                allTags={allTags}
                setAllTags={setAllTags}
                syncWithDB={syncWithDB}
                showTags={showTags}
                setShowTags={setShowTags}
                selectTag={selectTag}
              />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default BirdsGrid;
