import React, { Component } from "react";
import Avatar from "./Avatar";

export default class ChatListItems extends Component {
  selectChat = (e) => {
    e.preventDefault();
    this.props.SetTabClick(this.props.name, this.props.image);
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.remove("new");
    e.currentTarget.classList.add("active");
  };

  render() {
    console.log(this.props.newMessage)
    return (
      <div
        style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        onClick={this.selectChat}
        className={`chatlist__item ${this.props.newMessage ? "new" : false} `}
      >
        <Avatar image={this.props.image} />

        <div className="userMeta">
          <p>{this.props.name}</p>
          <span className="activeTime">32 mins ago</span>
        </div>
      </div>
    );
  }
}
