import React from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import mr_map from "../images/mr_map.png"; // Tell webpack this JS file uses this image

import { navigationItems} from "../config/index";

const Sidebar = () => {
	const useAuth = () => {
		const user = localStorage.getItem("user-info")
		if (user) {
			return true
		} else {
			return false
		}
	}
	const user = useAuth()
	const location = useLocation()
	const navigation = useNavigate()

	const logout = () => {
		localStorage.removeItem("user-info")
		navigation("/login")
	}

	return (
		<div className="sidebar">
			<div className="sidebar__items">
			<label id="name">Name</label>
			<img src={mr_map} className="sidebar__items__Logo" />
				{user && (
					<>
						{navigationItems.sidebar.map((item) => (
							<Link
								key={item.text}
								to={item.to}
								className={
									location.pathname.includes(item.to) ? "sidebar_active" : ""
								}>
								{item.name}
							</Link>
						))}
						{location.pathname !== "/login" && (
							<button onClick={logout} className="btn btn-danger">logout</button>
						)}
					</>
				)}
				{!user && (
					<Link
						to="/login"
						className={location.pathname === "/login" ? "sidebar_active" : ""}>
						Login
					</Link>
				)}
			</div>
		</div>
	)
}

export default Sidebar






/* import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { navigationItems} from "../config/index";
import mr_map from "../images/mr_map.png"; // Tell webpack this JS file uses this image

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__items">
        <img src={mr_map} className="sidebar__items__Logo" />
        <>
          {navigationItems.sidebar.map((item: any) => (
            <Link key={item.text} to={item.to}>
              {item.name}
            </Link>
          ))}

          {navigationItems.footer.map((item: any) => (
            <Link key={item.text} to={item.to}>
              {item.name}
            </Link>
          ))}
        </>
      </div>
    </div>
  );
};

export default Sidebar;
 */



