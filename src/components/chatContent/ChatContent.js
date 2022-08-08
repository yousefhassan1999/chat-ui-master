import React, { useState } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";

const ChatContent = ({
  sendValue,
  sendPrivateValue,
  AvatarLinks,
  UserName,
  tab,
  privateChats,
  publicChats,
}) => {

  const messagesEndRef = React.createRef(null);
  const [msg, setmsg] = useState("");

  const onStateChange = (e) => {
    e.preventDefault();
    setmsg(e.target.value);
  };

  const PRMessage = () => {
    setmsg("");
    sendPrivateValue(msg);
  };

  const PUMessage = () => {
    setmsg("");
    sendValue(msg);
  };
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  React.useEffect(scrollToBottom, [privateChats, publicChats]);

  const GetPrivateChatData = (item) => {
    for (var j = 0; j < privateChats.length; j++) {
      if (privateChats[j].senderName === item) {
        console.log(privateChats[j].Data);
        return privateChats[j].Data;
      }
    }
  };
  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            {tab !== "CHATROOM" ? (
              <React.Fragment>
                <Avatar image={AvatarLinks[parseInt(tab.split(",")[1])]} />
                <p>{tab.split(",")[0]}</p>
              </React.Fragment>
            ) : (
              <p>Public Chat Room</p>
            )}
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body" data-simplebar>
        <div className="chat__items">
          {tab === "CHATROOM"
            ? publicChats.map((chat, index) => (
                <ChatItem
                  animationDelay={index + 2}
                  key={index}
                  user={chat.senderName === UserName ? "other" : "me"}
                  msg={chat.message}
                  image={AvatarLinks[parseInt(chat.senderName.split(",")[1])]}
                />
              ))
            : GetPrivateChatData(tab).map((chat, index) => (
                <ChatItem
                  animationDelay={index + 2}
                  key={index}
                  user={chat.senderName === UserName ? "other" : "me"}
                  msg={chat.message}
                  image={AvatarLinks[parseInt(chat.senderName.split(",")[1])]}
                />
              ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={msg}
          />
          {tab === "CHATROOM" && (
            <button className="btnSendMsg" id="sendMsgBtn" onClick={PUMessage}>
              <i className="fa fa-paper-plane"></i>
            </button>
          )}
          {tab !== "CHATROOM" && (
            <button className="btnSendMsg" id="sendMsgBtn" onClick={PRMessage}>
              <i className="fa fa-paper-plane"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatContent;
