
import {Routes, Route, Navigate} from "react-router-dom"

import InnerContent from "./components/InnerContent"
import Dashboard from "./components/Dashboard"

import Login from "./components/Login"


import Example from "./components/Example"


import Users, { WmssType } from "./components/Wms"
import Wfss from "./components/Wfs"
import SingleWfs from "./components/SingleWfs"

import Error from "./components/Error"
import SingleWms from "./components/SingleWms"
import Footer from "./components/Footer"
import Wmss from "./components/Wms"
import Mapp from "./Mapps"


import ProtectedRoutes from "./components/ProtectedRoutes"
import PublicRoutes from "./components/PublicRoutes"
import PermissionDenied from "./components/PermissionDenied"

import React, { createContext } from "react"


export const ServiceContex  = React.createContext<unknown>({} as unknown)
const araba ="araba context"
const MainRoutes = () => (
	<ServiceContex.Provider value={{araba:'kirmizi', model:'yeni'}}>
	<Routes>
		{/** Protected Routes */}
		{/** Wrap all Route under ProtectedRoutes element */}
		<Route path="/" element={<ProtectedRoutes />}>
			<Route path="/" element={<InnerContent />}>
			<Route path="/" element={<Navigate replace to="dashboard" />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="map" element={<Mapp/>} />
				<Route path="footer" element={<Footer/>} />
				<Route path="wms"	element={<Wmss />}	/>
				<Route path="wfs" element={<Wfss />}/>
				<Route path="wms/:wmsId" element={<SingleWms/>} />
				<Route path="wfs/:wfsId" element={<SingleWfs />} />
					{/* <Route path="tab2" element={<ProtectedRoutes roleRequired="USER" />}> */}
					
			</Route>
		</Route>

		{/** Public Routes */}
		{/** Wrap all Route under PublicRoutes element */}
		<Route path="login" element={<PublicRoutes />}>
			<Route path="/login" element={<Login />} />
		</Route>

		{/** Permission denied route */}
		<Route path="/denied" element={<PermissionDenied />} />
		<Route path="*" element={<Error/>}></Route>
	</Routes>
	</ServiceContex.Provider>
)

export default MainRoutes








{/* 


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
import Mapp from "./Mapps"


export const ServiceContex  = React.createContext<unknown>({} as unknown)
const araba ="araba context"
const MainRoutes = () => (
	<ServiceContex.Provider value={{araba:'kirmizi', model:'yeni'}}>
	<Routes>
		
	

			<Route path="/" element={<InnerContent />}>
				<Route path="/" element={<Navigate replace to="dashboard" />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="map" element={<Mapp/>} />
				<Route path="footer" element={<Footer/>} />
				<Route path="wms"	element={<Wmss />}	/>
				<Route path="wfs" element={<Wfss />}/>
				<Route path="wms/:wmsId" element={<SingleWms/>} />
				<Route path="wfs/:wfsId" element={<SingleWfs />} />
			
			</Route>
			<Route path="*" element={<Error/>}></Route>


	</Routes>
	</ServiceContex.Provider>
)

export default MainRoutes  */}
 