import { IconButton, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { auth } from "../firebase/firebase";

const Main = () => {
  return (
    <div>
      <IconButton onClick={async () => auth.signOut()}>
        <Typography component="div">Sign Out</Typography>
        <ExitToAppIcon />
      </IconButton>
    </div>
  );
};

export default Main;
