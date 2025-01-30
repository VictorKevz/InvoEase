import React, { useContext } from "react";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/image-avatar.jpg";
import { NavLink } from "react-router-dom";
import { Home, Receipt } from "@mui/icons-material";
import "./navbar.css";
import { DataContext } from "../../App";

function Navbar() {
  const { dispatchForm, form,t } = useContext(DataContext);
  const navLinks = [
    { title: "Home", path: "/", icon: Home },
    { title: "Portal", path: "/portal", icon: Receipt },
  ];
  return (
    <header className="navbar-wrapper">
      <NavLink to="/" className="logo-item">
        <img src={logo} alt="logo" className="logo-img" />
        <span className="bottom"></span>
      </NavLink>
      <nav className="nav-wrapper">
        <ul className="nav-list" role="menubar">
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item" role="menuitem">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                onClick={() => {
                  form.showForm ? dispatchForm({ type: "RESET_FORM" }) : null;
                }}

              >
                <span className="nav-link-text">{t(link.title)}</span>
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
          to="/settings"
          onClick={() => {
            form.showForm ? dispatchForm({ type: "RESET_FORM" }) : null;
          }}
        >
          <img src={avatar} className="avatar-img" alt="User avatar"  />
          <span className="sr-only" aria-label="Go to settings page">Settings Page</span>
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
