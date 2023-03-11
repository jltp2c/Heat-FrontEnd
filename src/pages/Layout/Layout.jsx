import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Layout() {
  const { user, authenticateUser, removeToken } = useContext(AuthContext);
  function handleLogOut() {
    removeToken();
    authenticateUser();
  }
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
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          </NavLink>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
