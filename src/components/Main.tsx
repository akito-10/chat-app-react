import React, { useEffect, useState } from "react";
import {
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SendIcon from "@material-ui/icons/Send";
import { auth, db } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { MessageListType } from "../types";
import Chats from "./Chats";

import firebase from "firebase/app";

const useStyles = makeStyles(() => ({
  section: {
    position: "relative",
    height: "100vh",
    width: "100%",
  },
  box: {
    background: "#fff",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    borderRadius: 4,
    boxSizing: "border-box",
    height: 592,
    maxWidth: "100%",
    padding: "0 1rem",
    width: 650,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  header: {
    display: "flex",
    height: 50,
  },
  form: {
    position: "absolute",
    bottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "80%",
  },
}));

const Main: React.FC = () => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const text = localStorage.getItem("messageText");
  const [messageText, setMessageText] = useState<string>(text ? text : "");
  const [messageList, setMessageList] = useState<MessageListType[]>([]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("messages").add({
      userId: user.uid,
      text: messageText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setMessageText("");
    localStorage.removeItem("messageText");
  };

  useEffect(() => {
    const unSub = db
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessageList(
          snapshot.docs.map((doc) => ({
            messageId: doc.id,
            userId: doc.data().userId,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        );
      });
    return () => unSub();
  }, []);

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messageList]);

  return (
    <section className={classes.section}>
      <div className={classes.box}>
        <header className={classes.header}>
          <IconButton onClick={async () => auth.signOut()}>
            <Typography component="div">Sign Out</Typography>
            <ExitToAppIcon />
          </IconButton>
        </header>
        <Chats messageList={messageList} />
        <form className={classes.form} onSubmit={sendMessage}>
          <TextField
            className={classes.input}
            variant="outlined"
            fullWidth
            value={messageText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMessageText(e.target.value);
              localStorage.setItem("messageText", e.target.value);
            }}
          />
          <IconButton type="submit">
            <SendIcon fontSize="large" />
          </IconButton>
        </form>
      </div>
    </section>
  );
};

export default Main;
