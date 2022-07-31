import React from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";

const ChatBody = ({
  sendValue,
  sendPrivateValue,
  userData,
  allChats,
  AvatarLinks,
  SetTabClick,
  tab,
  privateChats,
  publicChats,
  mewMessage
}) => {
  
  return (
    <div className="main__chatbody">
      <div className="User_Info">
        <UserProfile userData={userData} AvatarLinks={AvatarLinks} />
        <ChatList
          tab={tab}
          userData={userData}
          allChats={allChats}
          SetTabClick={SetTabClick}
          AvatarLinks={AvatarLinks}
          mewMessage={mewMessage}
        />
      </div>
      <ChatContent
        userData={userData}
        AvatarLinks={AvatarLinks}
        tab={tab}
        privateChats={privateChats}
        publicChats={publicChats}
        sendValue={sendValue}
        sendPrivateValue={sendPrivateValue}
      />
    </div>
  );
};
export default ChatBody;
