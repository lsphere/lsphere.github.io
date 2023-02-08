import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
function NavBar({ scrollTo }) {
  const [visibleNav, setVisibleNav] = useState(false);
  const navigate = useNavigate();
  return (
    <header id="header" className="d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo">
          <a onClick={() => navigate("/")}>
            LearnSphere<span>.</span>
          </a>
        </h1>
        <a href="index.html" className="logo">
          {/* <img src="assets/img/logo.png" alt="" /> */}
        </a>

        <nav
          id="navbar"
          className={classNames("nav-bar", {
            "nav-bar-mobile": visibleNav === true,
          })}
        >
          <ul>
            <li>
              <a className="nav-link scrollto active" href="#hero">
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setVisibleNav(false);
                  scrollTo("about");
                }}
                className="nav-link scrollto"
              >
                About
              </a>
            </li>

            <li>
              <a
                onClick={() => {
                  setVisibleNav(false);
                  scrollTo("contact");
                }}
                className="nav-link scrollto"
              >
                Contact
              </a>
            </li>
          </ul>
          <i
            className={classNames("bi  mobile-nav-toggle", {
              "bi-list": visibleNav === true,
              "bi-x": visibleNav === false,
            })}
            onClick={() => setVisibleNav(!visibleNav)}
          >
            toggle
          </i>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
