import React, { useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

import "./App.css";
import ChatBody from "./components/chatBody/ChatBody";
import Register from "./components/Register/Register";

var stompClient = null;
const App = () => {
  const AvatarLinks = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
    "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
    "https://pbs.twimg.com/profile_images/770394499/female.png",
  ];
  const [tab, setTab] = useState("CHATROOM"); // public chatRoom or not
  const [privateChats, setPrivateChats] = useState(new Map()); // Private chatRoom >>> Map User With List of Messages
  const [mewMessage, setmewMessage] = useState(new Map()); // Private chatRoom >>> Map User With List of Messages
  const [publicChats, setPublicChats] = useState([]); // public chatRoom >>> List of Messages
  const [userData, setUserData] = useState({
    // Message content to send
    username: "",
    receivername: "",
    connected: false,
  });
  const [avatar, setavatar] = useState("");

  const connect = () => {
    if (userData.username !== "") {
      let Sock = new SockJS("https://chat-app-back-end-1.herokuapp.com/ws");
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    }
  };
  const onError = (err) => {
    alert(err);
    alert("please try again after few second to get backend server work. ");
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          mewMessage.set(payloadData.senderName, 0);
          setmewMessage(new Map(mewMessage));
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
      default:
        break;
    }
  };
  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      if (payloadData.senderName !== tab) {
        mewMessage.set(
          payloadData.senderName,
          mewMessage.get(payloadData.senderName) + 1
        );
        setmewMessage(new Map(mewMessage));
      }

      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      mewMessage.set(payloadData.senderName, 1);
      setmewMessage(new Map(mewMessage));
      setPrivateChats(new Map(privateChats));
    }
  };

  const sendValue = (msg) => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: msg,
        status: "MESSAGE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }
  };

  const sendPrivateValue = (msg) => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: msg,
        status: "MESSAGE",
      };
      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    }
  };

  const registerUser = () => {
    AvatarLinks.indexOf(avatar) === -1 && alert("Choose Avatar to connect");
    userData.username.split(",")[0] === "" && alert("Enter UserName to connect");

    if (AvatarLinks.indexOf(avatar) !== -1 && userData.username.split(",")[0] !== "") {
      setUserData({
        ...userData,
        username: userData.username.concat("," + AvatarLinks.indexOf(avatar)),
      });
      connect();
    }
  };

  const SelectAvatar = (URL) => {
    AvatarLinks.indexOf(avatar) === -1 &&
      setUserData({
        ...userData,
        username: userData.username.concat("," + AvatarLinks.indexOf(URL)),
      });
    setavatar(URL);
  };
  React.useEffect(() => {
    if (mewMessage.get(tab) > 0) {
      setmewMessage(mewMessage.set(tab, 0));
    }
  }, [tab, mewMessage]);

  const SetTabClick = (Tab, URL) => {
    Tab === "CHATROOM"
      ? setTab(Tab)
      : setTab(Tab.concat("," + AvatarLinks.indexOf(URL)));
  };

  const handleUsername = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const old = userData.username.split(",")[1];
    old === undefined
      ? setUserData({ ...userData, username: value.split(",")[0] })
      : setUserData({
          ...userData,
          username: value.split(",")[0].concat("," + old),
        });
  };

  return (
    <React.Fragment>
      {userData.connected ? (
        <div className="__main">
          <ChatBody
            userData={userData}
            AvatarLinks={AvatarLinks}
            allChats={privateChats}
            SetTabClick={SetTabClick}
            tab={tab}
            privateChats={privateChats}
            mewMessage={mewMessage}
            publicChats={publicChats}
            sendValue={sendValue}
            sendPrivateValue={sendPrivateValue}
          />
        </div>
      ) : (
        <Register
          userData={userData}
          AvatarLinks={AvatarLinks}
          SelectAvatar={SelectAvatar}
          registerUser={registerUser}
          handleUsername={handleUsername}
        />
      )}
    </React.Fragment>
  );
};

export default App;
