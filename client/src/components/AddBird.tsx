import React, { useState, useRef, SetStateAction, Dispatch } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { create as createBird, getUploadURL } from "../api";
import { Bird } from "../../../common/types";
import { JustUploadedBirdId, SyncWithDB } from "../App";

const useStyles = makeStyles((theme) => ({
  uploadButton: {
    display: "none",
  },
  addButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1,
  },
  progressContainer: {
    textAlign: "center",
  },
}));

interface AddBirdProps {
  setJustUploadedBirdId: Dispatch<SetStateAction<JustUploadedBirdId>>;
  syncWithDB: SyncWithDB;
}

function AddBird({ setJustUploadedBirdId, syncWithDB }: AddBirdProps) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);

  function handleOpen() {
    setOpen(true);
    setJustUploadedBirdId(null);
  }

  function handleClose() {
    setOpen(false);
    setUploading(false);
  }

  function handleUploadFinished(newBird: Bird) {
    setJustUploadedBirdId(newBird.id);
    setUploading(false);
    syncWithDB();
    handleClose();
  }

  function readFile(file: File): Promise<Blob> {
    return new Promise((resolve) => {
      const fileReader = new FileReader();

      fileReader.onloadend = function () {
        const blob = new Blob([fileReader.result as ArrayBuffer], {
          type: file.type,
        });

        resolve(blob);
      };

      fileReader.readAsArrayBuffer(file);
    });
  }

  function uploadFile(uploadURL: string, blob: Blob): Promise<unknown> {
    if (process.env.NODE_ENV === "development") {
      return Promise.resolve();
    }

    return fetch(uploadURL, {
      method: "PUT",
      body: blob,
    });
  }

  async function handleFileSelected() {
    const file = inputEl.current?.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);

    const blob = await readFile(file);
    const { uploadURL, key } = await getUploadURL(file.type);
    await uploadFile(uploadURL, blob);
    const newBird = await createBird({
      img: `${process.env.REACT_APP_IMAGE_BUCKET_URL}/${key}`,
      tags: [],
    });

    handleUploadFinished(newBird);
  }

  const classes = useStyles();

  return (
    <>
      <Tooltip title="Upload Picture">
        <Fab
          color="primary"
          aria-label="add bird"
          onClick={handleOpen}
          className={classes.addButton}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        disableBackdropClick={uploading}
        disableEscapeKeyDown={uploading}
      >
        {uploading ? (
          <>
            <DialogTitle>Uploading Picture</DialogTitle>
            <DialogContent className={classes.progressContainer}>
              <CircularProgress />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Upload Picture</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Select a picture of a bird from your device.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <input
                type="file"
                id="button-file"
                className={classes.uploadButton}
                accept="image/*"
                onChange={handleFileSelected}
                ref={inputEl}
              />
              <label htmlFor="button-file">
                <Button component="span" color="primary">
                  Browse
                </Button>
              </label>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

export default AddBird;
