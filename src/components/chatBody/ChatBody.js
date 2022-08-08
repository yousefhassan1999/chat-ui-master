import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate } from "react-router-dom";

import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";
import {
  SetTabValue,
  SendPrivateMessage,
  SetnewMessageValue,
} from "../../redux/UserData/UserDataSlice";

const ChatBody = ({ stompClient, AvatarLinks }) => {
  let navigate = useNavigate();
  const { username } = useSelector((state) => state.UserNameStore);
  const UserDataStore = useSelector((state) => state.UserDataStore);
  const dispatch = useDispatch();

  const sendValue = (msg) => {
    if (stompClient) {
      var chatMessage = {
        senderName: username,
        message: msg,
        status: "MESSAGE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }
  };

  const sendPrivateValue = (msg) => {
    if (stompClient) {
      var chatMessage = {
        senderName: username,
        receiverName: UserDataStore.Tab,
        message: msg,
        status: "MESSAGE",
      };
      if (username !== UserDataStore.Tab) {
        dispatch(SendPrivateMessage(chatMessage));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    }
  };

  React.useEffect(() => {
    for (var j = 0; j < UserDataStore.mewMessage.length; j++) {
      if (UserDataStore.mewMessage[j].senderName === UserDataStore.Tab) {
        dispatch(SetnewMessageValue(UserDataStore.Tab));
        break;
      }
    }
  }, [UserDataStore.Tab, UserDataStore.mewMessage, dispatch]);

  const SetTabClick = (Tab, URL) => {
    if (Tab === "CHATROOM") {
      dispatch(SetTabValue(Tab));
    } else {
      dispatch(SetTabValue(Tab.concat("," + AvatarLinks.indexOf(URL))));
    }
  };

  React.useEffect(() => {
    try {
      var chatMessage = {
        senderName: username,
        status: "JOIN",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    } catch {
      navigate("/");
    }
  }, [stompClient, username,navigate]);

  return (
    <div className="main__chatbody">
      <div className="User_Info">
        <UserProfile UserName={username} AvatarLinks={AvatarLinks} />
        <ChatList
          tab={UserDataStore.Tab}
          UserName={username}
          allChats={UserDataStore.privateChats}
          SetTabClick={SetTabClick}
          AvatarLinks={AvatarLinks}
          mewMessage={UserDataStore.mewMessage}
        />
      </div>
      <ChatContent
        UserName={username}
        AvatarLinks={AvatarLinks}
        tab={UserDataStore.Tab}
        privateChats={UserDataStore.privateChats}
        publicChats={UserDataStore.publicChats}
        sendValue={sendValue}
        sendPrivateValue={sendPrivateValue}
      />
    </div>
  );
};
export default ChatBody;
