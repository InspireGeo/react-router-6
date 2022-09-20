import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"

import InnerContent from "./components/InnerContent"
import Dashboard from "./components/Dashboard"
import Example from "./components/Example"


import Users from "./components/Wms"


import Wfss from "./components/Wfs"
import SingleWfs from "./components/SingleWfs"
import SingleUser from "./components/SingleWms"
import Error from "./components/Error"
import SingleWms from "./components/SingleWms"
import Footer from "./components/Footer"

const MainRoutes = () => (
	<Routes>
		{/** Protected Routes */}
		{/** Wrap all Route under ProtectedRoutes element */}

			<Route path="/" element={<InnerContent />}>
				<Route path="/" element={<Navigate replace to="dashboard" />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="example" element={<Example/>} />
				<Route path="footer" element={<Footer/>} />
				<Route
					path="wms"
					element={<Users extraItem="test extra item from router" />}
				/>
				<Route
					path="wfs"
					element={<Wfss extraItem="test extra item from router" />}
				/>
				<Route path="wms/:wmsId" element={<SingleWms/>} />
				<Route path="wfs/:wfsId" element={<SingleWfs />} />
			
			</Route>
			<Route path="*" element={<Error/>}></Route>


	</Routes>
)

export default MainRoutes
