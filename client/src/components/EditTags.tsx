import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@material-ui/core";
import {
  Edit as EditIcon,
  AddCircle as AddCircleIcon,
} from "@material-ui/icons";
import { Bird } from "../../../common/types";
import { update } from "../api";
import { SyncWithDB, Tags } from "../App";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  newTagContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  editButton: {
    minWidth: "unset",
    opacity: 0.5,
    "&:hover": {
      opacity: 1,
    },
    transition: "unset",
    marginLeft: 0,
    marginRight: theme.spacing(1),
  },
  checkBox: {
    padding: 0,
    paddingRight: theme.spacing(1),
  },
}));

interface EditTagProps {
  bird: Bird;
  allTags: Tags;
  setAllTags: Dispatch<SetStateAction<Tags>>;
  syncWithDB: SyncWithDB;
}

type SelectedTags = { [k: string]: boolean | null };

function EditTags({
  bird,
  allTags,
  setAllTags,
  syncWithDB,
}: EditTagProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTags, setSelectedTags] = useState({} as SelectedTags);
  const [newTag, setNewTag] = useState("");
  const mainButtonEl = useRef(null);

  function handleOpen() {
    setAnchorEl(mainButtonEl.current);

    const originalSelectedTags = {} as SelectedTags;
    allTags.forEach((tag) => {
      originalSelectedTags[tag] = bird.tags.includes(tag) || null;
    });

    setSelectedTags(originalSelectedTags);
  }

  function handleClose() {
    setAnchorEl(null);

    const selectedTagsArray = Object.keys(selectedTags).filter(
      (tag) => selectedTags[tag]
    );

    update({
      ...bird,
      tags: selectedTagsArray,
    }).then(() => {
      syncWithDB();
    });
  }

  function handleTagClick(tag: string) {
    setSelectedTags((prevCheckedState) => ({
      ...prevCheckedState,
      [tag]: !prevCheckedState[tag],
    }));
  }

  function handleNewTagTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTag(event.target.value);
  }

  function addTag() {
    if (newTag === "" || newTag === undefined) {
      return;
    }

    const fixedNewTag = newTag
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");

    setSelectedTags((prevCheckedState) => ({
      ...prevCheckedState,
      [fixedNewTag]: true,
    }));

    setAllTags((prevAllTags) => {
      prevAllTags.add(fixedNewTag);
      return new Set(prevAllTags);
    });

    setNewTag("");
  }

  const classes = useStyles();

  return (
    <>
      <Tooltip title="Edit Labels">
        <Button
          color="primary"
          variant="contained"
          size="small"
          aria-label="add tag"
          onClick={handleOpen}
          ref={mainButtonEl}
          className={classes.editButton}
        >
          <EditIcon />
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        variant="menu"
        disableAutoFocusItem
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {Array.from(allTags)
          .sort()
          .map((tag) => (
            <MenuItem
              key={tag}
              dense
              selected={!!selectedTags[tag]}
              onClick={() => handleTagClick(tag)}
            >
              <Checkbox
                checked={!!selectedTags[tag]}
                className={classes.checkBox}
              />
              {tag}
            </MenuItem>
          ))}
        <div className={classes.newTagContainer}>
          <TextField
            label="New Label"
            value={newTag}
            variant="outlined"
            size="small"
            onChange={handleNewTagTextChange}
            onKeyDown={(event) => {
              event.stopPropagation();

              // @ts-ignore
              if (event.code === "Enter") {
                addTag();
              }
            }}
          />
          <IconButton aria-label="add tag" onClick={addTag}>
            <AddCircleIcon color="primary" />
          </IconButton>
        </div>
      </Menu>
    </>
  );
}

export default EditTags;
