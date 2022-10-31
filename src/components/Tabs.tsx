import React from "react"
import {Outlet} from "react-router-dom"

import TabNav from "./TabNav"

const Tabs = (props: any) => {
	const {userName} = props.props
	return (
		<div className="tabs">
			<h1>Tabs demo page {userName}</h1>

			{/** Tab navigation  */}
			<TabNav />
			{/** Tab inner content */}
			<Outlet />
		</div>
	)
}

export default Tabs