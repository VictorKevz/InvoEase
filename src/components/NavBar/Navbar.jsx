import React from "react";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/image-avatar.jpg";
import { NavLink, useParams } from "react-router-dom";
import { Home, Receipt, Settings } from "@mui/icons-material";
import "./navbar.css";

function Navbar() {
  const navLinks = [
    { title: "Home", path: "/", icon: Home },
    { title: "Portal", path: "/portal", icon: Receipt },
  ];
  const { current } = useParams();
  const isSettings = current === "settings";
  return (
    <header className="navbar-wrapper">
      <NavLink to="/" className="logo-item">
        <img src={logo} alt="logo" className="logo-img" />
        <span className="bottom"></span>
      </NavLink>
      <nav className="nav-wrapper">
        <ul className="nav-list">
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                <span className="nav-link-text">{link.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="settings-profile-wrapper">
        <NavLink 
        className={({ isActive }) =>
          `profile ${isActive ? "active-settings" : ""}`
        } 
        to="/settings">
          <img src={avatar} className="avatar-img" />
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
