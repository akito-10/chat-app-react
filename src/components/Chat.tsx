import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { MessageListType } from "../types";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  info: {
    display: "flex",
  },
  chat: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "60%",
  },
  text: {
    borderRadius: 4,
    color: "#111",
    fonSize: 14,
    fontWeight: 500,
    padding: ".5rem",
    marginRight: "1rem",
    overflowWrap: "break-word",
    width: "auto",
  },
}));

const Chat: React.FC<MessageListType> = ({
  text,
  userId,
  timestamp,
  username,
}) => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const styles = userId === user.uid ? "chat_row" : "chat_reverse";
  const bgColor = userId === user.uid ? "#41B6E6" : "#ccc";

  return (
    <ListItem className={styles}>
      <div className={classes.chat}>
        <div className={classes.info}>
          <p style={{ marginRight: 10 }}>{username}</p>
          <p>
            {timestamp
              ? new Date(timestamp.toDate()).toLocaleString()
              : "取得中..."}
          </p>
        </div>
        <div className={classes.text} style={{ background: bgColor }}>
          {text}
        </div>
      </div>
    </ListItem>
  );
};

export default Chat;
