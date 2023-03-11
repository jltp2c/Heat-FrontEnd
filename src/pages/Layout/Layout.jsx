import React from "react";
import { Outlet, NavLink } from "react-router-dom";

function Layout() {
  return (
    <div>
      <p>LAYOUT TEST</p>
      <nav>
        <ul>
          <NavLink>
            <li>Board</li>
          </NavLink>
          <NavLink>
            <li>Profile</li>
          </NavLink>
          <NavLink>
            <li>Foods</li>
          </NavLink>
          <NavLink to="/">
            <li>Log Out</li>
          </NavLink>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
