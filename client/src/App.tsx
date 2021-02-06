import React, { useEffect, useState } from "react";
import BirdsGrid from "./components/BridsGrid";
import AddBird from "./components/AddBird";
import { CssBaseline, makeStyles } from "@material-ui/core";
import Filters from "./components/Filters";
import { Bird } from "../../common/types";
import { list } from "./api";

export type Tags = Set<string>;
export type SyncWithDB = () => Promise<unknown>;
export type JustUploadedBirdId = string | null;

const useStyles = makeStyles(() => ({
  root: {},
}));

function App() {
  const [birds, setBirds] = useState([] as Bird[]);
  const [allTags, setAllTags] = useState(new Set() as Tags);
  const [selectedTags, setSelectedTags] = useState(new Set() as Tags);
  const [showAll, setShowAll] = useState(true);
  const [justUploadedBirdId, setJustUploadedBirdId] = useState(
    null as JustUploadedBirdId
  );

  useEffect(() => {
    syncWithDB();
  }, []);

  const syncWithDB: SyncWithDB = () => {
    console.log("syncing");

    return list().then((birdsFromDB) => {
      const allTagsFromDB = new Set() as Tags;

      birdsFromDB.forEach((bird) => {
        bird.tags.forEach((tag) => {
          allTagsFromDB.add(tag);
        });
      });

      return Promise.all([setBirds(birdsFromDB), setAllTags(allTagsFromDB)]);
    });
  };

  const birdsToDisplay = justUploadedBirdId
    ? birds.filter((bird) => bird.id === justUploadedBirdId)
    : showAll
    ? birds
    : birds.filter((bird) => bird.tags.some((tag) => selectedTags.has(tag)));

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Filters
          allTags={allTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          showAll={showAll}
          setShowAll={setShowAll}
          justUploadedBirdId={justUploadedBirdId}
          setJustUploadedBirdId={setJustUploadedBirdId}
        />
        <BirdsGrid
          birds={birdsToDisplay}
          allTags={allTags}
          setAllTags={setAllTags}
          syncWithDB={syncWithDB}
        />
        <AddBird
          setJustUploadedBirdId={setJustUploadedBirdId}
          syncWithDB={syncWithDB}
        />
      </div>
    </>
  );
}

export default App;
