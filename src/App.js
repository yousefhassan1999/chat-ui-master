import React from "react";
import { useDispatch } from "react-redux";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import ChatBody from "./components/chatBody/ChatBody";
import Register from "./components/Register/Register";
import { SetUsername } from "./redux/UserData/UserNameSlice";
import {
  OnPublicMessageReceived,
  OnPrivateMessageReceived,
} from "./redux/UserData/UserDataSlice";

var stompClient = null;
const App = () => {
  let navigate = useNavigate();

  const AvatarLinks = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
    "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
  ];
  const dispatch = useDispatch();

  const connect = (userName) => {
    if (userName !== "") {
      dispatch(SetUsername(userName));
      let Sock = new SockJS("https://chat-app-back-end-1.herokuapp.com/ws");
      stompClient = over(Sock);
      stompClient.connect(
        {},
        () => {
          stompClient.subscribe("/chatroom/public", onMessageReceived);
          stompClient.subscribe(
            "/user/" + userName + "/private",
            onPrivateMessage
          );
          navigate({ pathname: "/HomePage", state: stompClient });
          window.localStorage.setItem("MY_APP_STATE", stompClient);
        },
        onError
      );
    }
  };

  const onError = (err) => {
    alert(err);
    alert("please try again after few second to get backend server work. ");
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    dispatch(OnPublicMessageReceived(payloadData));
  };
  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    dispatch(OnPrivateMessageReceived(payloadData));
  };

  return (
    <React.Fragment>
      <Routes>
        <Route
          exact
          path="/HomePage"
          element={
            <div className="__main">
              <ChatBody stompClient={stompClient} AvatarLinks={AvatarLinks} />
            </div>
          }
        />
        <Route
          path="/"
          element={<Register AvatarLinks={AvatarLinks} connect={connect} />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
