import React, { useLayoutEffect, useState } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import "simplebar";
import "simplebar/dist/simplebar.css";

export const allConnections = (allChats) => {
  const AllConnecting = [];
  for (var i = 0; i < allChats.length; i++) {
    AllConnecting[i] = allChats[i].senderName;
  }
  return AllConnecting;
};
export const GetNewMessageNum = (item, mewMessage) => {
  for (var i = 0; i < mewMessage.length; i++) {
    if (mewMessage[i].senderName === item) {
      return mewMessage[i].Data;
    }
  }
  return 0;
};

const ChatList = ({
  tab,
  UserName,
  allChats,
  SetTabClick,
  AvatarLinks,
  mewMessage,
}) => {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
  }, [size]);

  const toggleInfo = (e) => {
    e.preventDefault();
    e.target.parentNode.parentNode.parentNode.classList.toggle("open");
  };
  const allConnection = allConnections(allChats);
  return (
    <div className="main__chatlist open">
      <button
        className={`btn ${tab === "CHATROOM" ? "clicked" : ""}`}
        onClick={() => SetTabClick("CHATROOM", "")}
      >
        <span>Chat Room</span>
      </button>
      <div className="chatlist__heading">
        <h2>Private Chats</h2>
        {size <= 768 && (
          <button className="btn-nobg">
            <i className="fa fa-angle-down" onClick={toggleInfo}></i>
          </button>
        )}
      </div>

      {allConnection.length !== 1 ? (
        <div className="chatlist__items" data-simplebar>
          {allConnection
            .filter((item) => item !== UserName)
            .map((item, index) => {
              const num = GetNewMessageNum(item, mewMessage);
              return (
                <ChatListItems
                  name={item.split(",")[0]}
                  key={index}
                  animationDelay={index + 1}
                  image={AvatarLinks[parseInt(item.split(",")[1])]}
                  SetTabClick={SetTabClick}
                  newMessage={num > 0}
                />
              );
            })}
        </div>
      ) : (
        <div className="chatlist__items" data-simplebar>
          <div className="empty_message_show">
            No Connection Members After you
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatList;
