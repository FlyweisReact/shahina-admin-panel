/** @format */

import React from "react";

const ChatMenu = ({ messages }) => {
  return (
    <>
      <aside className="p-4 h-auto">
        <nav className="menu-list">
          {messages?.map((nav, index) => {
            return (
              <span key={index} className="container">
                <img src={nav?.user?.avatar} alt="" />
                <p> {nav?.user?.name} </p>
              </span>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default ChatMenu;
