import React from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"

import {navigationItems} from "../config"

const Sidebar = () => {
	
	

	return (
		<div className="sidebar">
			<div className="sidebar__items">
				
					<>
						{navigationItems.sidebar.map((item) => (
							<Link
								key={item.text}
								to={item.to}
							>
								{item.name}
							</Link>
						))}
					
					</>
				
				
			</div>
		</div>
	)
}

export default Sidebar
