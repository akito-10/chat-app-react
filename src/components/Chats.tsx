import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Chat from "./Chat";
import { MessageListType } from "../types";

type ChatsProps = {
  messageList: MessageListType[];
};

const useStyles = makeStyles(() => ({
  chats: {
    height: 400,
    padding: "0",
    overflow: "auto",
  },
}));

const Chats: React.FC<ChatsProps> = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.chats} id={"scroll-area"}>
      {props.messageList.map((message) => (
        <Chat
          messageId={message.messageId}
          text={message.text}
          userId={message.userId}
          username={message.username}
          timestamp={message.timestamp}
          key={message.messageId}
        />
      ))}
    </List>
  );
};

export default Chats;
