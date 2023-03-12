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
      <h1>HEAT</h1>
      <nav>
        <ul className="navBar">
          <NavLink to="/board">
            <li>Board</li>
          </NavLink>
          <NavLink to="/board/profile">
            <li>Profile</li>
          </NavLink>
          <NavLink to="/board/foods">
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
