import React, { Dispatch, SetStateAction, useState } from "react";
import { Grid } from "@material-ui/core";
import { Bird } from "../../../common/types";
import { SyncWithDB, Tags } from "../App";
import BirdGridItem from "./BridGridItem";

interface BirdsGridProps {
  birds: Bird[];
  allTags: Tags;
  setAllTags: Dispatch<SetStateAction<Tags>>;
  syncWithDB: SyncWithDB;
}

function BirdsGrid({ birds, allTags, setAllTags, syncWithDB }: BirdsGridProps) {
  const [showTags, setShowTags] = useState(true);

  return (
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
        />
      ))}
    </Grid>
  );
}

export default BirdsGrid;
