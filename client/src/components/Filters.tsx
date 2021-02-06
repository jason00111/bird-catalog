import React, { Dispatch, SetStateAction } from "react";
import { Chip, makeStyles, Slide, useScrollTrigger } from "@material-ui/core";
import { JustUploadedBirdId, Tags } from "../App";

// Allow multiple tags to be selected at once
const MULTI_SELECT = false;

const useStyles = makeStyles((theme) => {
  // console.log(theme);

  return {
    root: {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      overflow: "auto",
      padding: "0.5rem",
      paddingBottom: "0.7rem",
      position: "sticky",
      top: 0,
      zIndex: 1,
      background: theme.palette.background.default,
    },
    chip: {
      marginLeft: "0.1rem",
      marginRight: "0.1rem",
    },
    firstChip: {
      marginLeft: 0,
    },
  };
});

interface FiltersProps {
  allTags: Tags;
  selectedTags: Tags;
  setSelectedTags: Dispatch<SetStateAction<Tags>>;
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
  justUploadedBirdId: JustUploadedBirdId;
  setJustUploadedBirdId: Dispatch<SetStateAction<JustUploadedBirdId>>;
}

function Filters({
  allTags,
  selectedTags,
  setSelectedTags,
  showAll,
  setShowAll,
  justUploadedBirdId,
  setJustUploadedBirdId,
}: FiltersProps) {
  function handleTagClick(tag: string) {
    setShowAll(false);
    setJustUploadedBirdId(null);

    if (MULTI_SELECT) {
      if (selectedTags.has(tag)) {
        setSelectedTags((prevSelectedTags) => {
          prevSelectedTags.delete(tag);

          return new Set(selectedTags);
        });
      } else {
        selectedTags.add(tag);
        setSelectedTags(new Set(selectedTags));
      }
    } else {
      setSelectedTags(new Set([tag]));
    }
  }

  function handleShowAllClick() {
    if (justUploadedBirdId) {
      setShowAll(true);
      setJustUploadedBirdId(null);
    } else {
      setShowAll((prevShowAll) => !prevShowAll);
    }
  }

  const trigger = useScrollTrigger();
  const classes = useStyles();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <div className={classes.root}>
        <Chip
          label="Show All"
          color={
            justUploadedBirdId ? "default" : showAll ? "primary" : "default"
          }
          onClick={handleShowAllClick}
          className={`${classes.chip} ${classes.firstChip}`}
        />
        {Array.from(allTags)
          .sort()
          .map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleTagClick(tag)}
              color={
                justUploadedBirdId || showAll
                  ? "default"
                  : selectedTags.has(tag)
                  ? "primary"
                  : "default"
              }
              className={classes.chip}
            />
          ))}
      </div>
    </Slide>
  );
}

export default Filters;
