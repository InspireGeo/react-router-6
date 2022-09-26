import React, { createContext } from "react"
import {Routes, Route, Navigate} from "react-router-dom"

import InnerContent from "./components/InnerContent"
import Dashboard from "./components/Dashboard"
import Example from "./components/Example"


import Users, { WmssType } from "./components/Wms"
import Wfss from "./components/Wfs"
import SingleWfs from "./components/SingleWfs"

import Error from "./components/Error"
import SingleWms from "./components/SingleWms"
import Footer from "./components/Footer"
import Wmss from "./components/Wms"


export const ServiceContex  = React.createContext<unknown>({} as unknown)
const araba ="araba context"
const MainRoutes = () => (
	<ServiceContex.Provider value={{araba:'kirmizi', model:'yeni'}}>
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
					element={<Wmss />}
				/>
				<Route
					path="wfs"
					element={<Wfss />}
				/>
				<Route path="wms/:wmsId" element={<SingleWms/>} />
				<Route path="wfs/:wfsId" element={<SingleWfs />} />
			
			</Route>
			<Route path="*" element={<Error/>}></Route>


	</Routes>
	</ServiceContex.Provider>
)

export default MainRoutes
