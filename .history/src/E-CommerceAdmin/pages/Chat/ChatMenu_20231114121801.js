/** @format */

import React from "react";
import { MdDashboardCustomize } from "react-icons/md";

const ChatMenu = ({messages}) => {
  console.log(messages)
  const nav = 
  
  
  [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/dashboard ",
      name: "Dashboard",
    },
    {
      icon: (
        <i className="fa-brands fa-product-hunt text-xl mr-3 rounded-full"></i>
      ),
      link: "/Product",
      name: "Products",
    },

    {
      icon: (
        <i className="fa-brands fa-product-hunt text-xl mr-3 rounded-full"></i>
      ),
      link: "/service",
      name: "Service",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/gallery",
      name: "Gallery",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/getblog",
      name: "News",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/privacy-policy",
      name: "Privacy Policy",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/terms",
      name: "Terms",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/brand",
      name: "Brand",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/nutrition",
      name: "Nutrition",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/Product-type",
      name: "Product Type",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/skin-condition",
      name: "Skin Condition",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/skinType",
      name: "Skin Type",
    },
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/Category",
      name: "Category",
    },

    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/subscription",
      name: "Subscription",
    },

    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/reviews",
      name: "Review",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/about-us",
      name: "About Us",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/faq",
      name: "FAQ",
    },
    {
      icon: (
        <i className="fa-solid fa-circle-info  text-xl mr-3 rounded-full"></i>
      ),
      link: "/contact",
      name: "Contact Details",
    },
    {
      icon: (
        <i className="fa-solid fa-circle-info  text-xl mr-3 rounded-full"></i>
      ),
      link: "/query",
      name: "Query",
    },
    {
      icon: (
        <i className="fa-solid fa-circle-info  text-xl mr-3 rounded-full"></i>
      ),
      link: "/ingredients",
      name: "Ingredients",
    },
    {
      icon: (
        <i className="fa-solid fa-circle-info  text-xl mr-3 rounded-full"></i>
      ),
      link: "/giftCard",
      name: "Gift Card",
    },
    {
      icon: (
        <i className="fa-solid fa-circle-info  text-xl mr-3 rounded-full"></i>
      ),
      link: "/acne",
      name: "Acne Quiz",
    },
    {
      icon: (
        <i className="fa-solid fa-circle-info  text-xl mr-3 rounded-full"></i>
      ),
      link: "/acne-suggestion",
      name: "Acne Suggestion",
    },
    {
      icon: (
        <i className="fa-solid fa-circle-info  text-xl mr-3 rounded-full"></i>
      ),
      link: "/add-on-service",
      name: "Add On Service",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/banner",
      name: "Banner",
    },
    {
      icon: (
        <i className="fa-solid fa-cart-shopping text-xl mr-3 rounded-full"></i>
      ),
      link: "/Orders",
      name: " Product Orders ",
    },
    {
      icon: (
        <i className="fa-solid fa-cart-shopping text-xl mr-3 rounded-full"></i>
      ),
      link: "/service-order",
      name: " Service Orders ",
    },

    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/user",
      name: "All User",
    },

    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/frequently",
      name: "Bundeled Product",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/transaction",
      name: "Transaction",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/rewards",
      name: "Rewards",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/scheduler",
      name: "Scheduler",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/shipping",
      name: "Shipping",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/slot",
      name: "Slot",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/shipping-privacy",
      name: "Shipping Privacy Policy",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/return-privacy",
      name: "Return Privacy Policy",
    },
    {
      icon: <i className="fa-solid fa-user  text-xl mr-3 rounded-full"></i>,
      link: "/chat",
      name: "Chat",
    },
  ];

  return (
    <>
      <aside className="p-4 h-auto" style={{ minHeight: "100vh" }}>
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <span key={nav.name} className="">
                <span className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav.name}
                </span>
              </span>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default ChatMenu;
