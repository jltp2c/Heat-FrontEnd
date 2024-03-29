import React, { useContext } from "react";
import { Outlet, Navigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ustensils from "../../assets/img/icons/utensils.svg"

function Layout() {
  const { user } = useContext(AuthContext);

  if (!user.profile) {
    return <Navigate to="/createprofile" />;
  }

  return (
    <div>
      <Outlet />
      <div className="containerNavBar">
        <footer>
          <hr />
          <nav>
            <ul className="navBar">
              <NavLink to="/board/profile">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </li>
              </NavLink>
              <NavLink to="/board">
                {}
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </li>
              </NavLink>
              <NavLink to="/board/foods">
                <li>
                 <img src={ustensils} alt="" />
                </li>
              </NavLink>
            </ul>
          </nav>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
