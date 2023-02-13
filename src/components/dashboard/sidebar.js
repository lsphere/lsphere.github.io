import React, { Component } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

import { Nav } from "react-bootstrap";
import sidebarImage from "../../assets/sidebar-3.jpg";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeRoute = (routeName, components) => {
    return location.pathname.indexOf(routeName) >= 0 ||
      components.some((str) => location.pathname.includes(str))
      ? "active"
      : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <div className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
                src={sidebarImage}
                alt="..."
              />
            </div>
          </div>
          <div>
            <div className="simple-text">Diana Sleem</div>
            <div className="simple-text">Student</div>
          </div>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path, prop.components)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link sidebar-nav-links d-flex align-items-center"
                    activeclassname="active"
                  >
                    {prop.icon}
                    <p className="mx-2">{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
