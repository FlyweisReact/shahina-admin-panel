/** @format */

import React from "react";

const ChatMenu = ({ messages }) => {
  return (
    <>
      <aside className="h-auto">
        <nav className="py-6  menu-list">
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
