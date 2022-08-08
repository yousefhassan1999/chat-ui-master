import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import Avatar from "./avatar";
import "./register.css";
 
const Register = ({ connect, AvatarLinks }) => {
  const [userName, setuserName] = useState("");
  const [avatar, setavatar] = useState("");
  const [Disable, setDisablee] = useState(false);
  const handleUsername = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const old = userName.split(",")[1];
    old === undefined
      ? setuserName(value.split(",")[0])
      : setuserName(value.split(",")[0].concat("," + old));
  };

  const SelectAvatar = (URL) => {
    AvatarLinks.indexOf(avatar) === -1 &&
      setuserName(userName.concat("," + AvatarLinks.indexOf(URL)));
    setavatar(URL);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    AvatarLinks.indexOf(avatar) === -1 && alert("Choose Avatar to connect");
    userName.split(",")[0] === "" && alert("Enter UserName to connect");

    if (AvatarLinks.indexOf(avatar) !== -1 && userName.split(",")[0] !== "") {
      setDisablee(true);
      setuserName(userName.concat("," + AvatarLinks.indexOf(avatar)));
      connect(userName);
    }
  };

  return (
    <div className="backgroundImage">
      <div className="register">
        <div className="slection-title">Select Avatar Photo</div>
        <div className="avatar_selction" style={{ margin: 30 }}>
          <Carousel className="corssal">
            {AvatarLinks.map((avatar) => (
              <Avatar image={avatar} SelectAvatar={SelectAvatar} key={avatar} />
            ))}
          </Carousel>
        </div>
        <div className="User_Enter">
          <input
            className="registeInput"
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userName.split(",")[0]}
            onChange={handleUsername}
            margin="normal"
          />
          <button
            type="button"
            className="registeconnect"
            onClick={registerUser}
            disabled={Disable}
          >
            connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
