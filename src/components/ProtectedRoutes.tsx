import { userInfo } from "os"
import React from "react"

import {Navigate, Outlet} from "react-router-dom"

const useAuth = () => {
	//get item from localstorage

	let user: any

	const _user = localStorage.getItem("user-info")

	if (_user) {
		user = JSON.parse(_user)
		console.log("user", user)
	}
	if (user) {
	
		return {
			auth: true,
			 role: "mrmap"
		
		}
	} else {
		return {
			auth: false,
			role: null
		}
	}
}

//protected Route state
type ProtectedRouteType = {
	roleRequired?: "mrmap"
}

const ProtectedRoutes = (props: ProtectedRouteType) => {
	const {auth,role} = useAuth()

	//if the role required is there or not
	if (props.roleRequired) {
		return auth ? (
			props.roleRequired === role ? (
				<Outlet />
			) : (
				<Navigate to="/denied" />
			)
		) : (
			<Navigate to="/login" />
		)
	} else {
		return auth ? <Outlet /> : <Navigate to="/login" />
	}
}

export default ProtectedRoutes