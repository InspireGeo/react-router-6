import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"

import InnerContent from "./components/InnerContent"
import Dashboard from "./components/Dashboard"


import Users from "./components/Wms"
import SingleUser from "./components/SingleWms"


import Wfss from "./components/Wfs"
import SingleWfs from "./components/SingleWfs"

const MainRoutes = () => (
	<Routes>
		{/** Protected Routes */}
		{/** Wrap all Route under ProtectedRoutes element */}

			<Route path="/" element={<InnerContent />}>
				<Route path="/" element={<Navigate replace to="dashboard" />} />
				<Route path="dashboard" element={<Dashboard />} />
				
				
				<Route
					path="users"
					element={<Users extraItem="test extra item from router" />}
				/>
				<Route
					path="wfs"
					element={<Wfss extraItem="test extra item from router" />}
				/>
				<Route path="users/:userId" element={<SingleUser />} />
				<Route path="wfs/:userId" element={<SingleWfs />} />
			
			</Route>


	</Routes>
)

export default MainRoutes
