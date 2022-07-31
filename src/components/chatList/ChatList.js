import React, { useLayoutEffect, useState } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import "simplebar";
import "simplebar/dist/simplebar.css";

const ChatList = ({
  tab,
  userData,
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
  const allConnections = [...allChats.keys()];
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

      {allConnections.length !== 1 ? (
        <div className="chatlist__items" data-simplebar>
          {allConnections
            .filter((item) => item !== userData.username)
            .map((item, index) => {
              return (
                <ChatListItems
                  name={item.split(",")[0]}
                  key={index}
                  animationDelay={index + 1}
                  image={AvatarLinks[parseInt(item.split(",")[1])]}
                  SetTabClick={SetTabClick}
                  newMessage={mewMessage.get(item) > 0}
                />
              );
            })}
        </div>
      ) : (
        <div className="empty_message_show">Connection Members After you</div>
      )}
    </div>
  );
};
export default ChatList;
