import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <p>LAYOUT TEST</p>

      <Outlet />
    </div>
  );
}

export default Layout;
