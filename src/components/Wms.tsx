import React from "react"
import {Link} from "react-router-dom"
import axios from "axios";

export type WmsType = {
	id: number
	name: string
	email: string
	phone: string
	website: string
	type:string
	attributes: Attributes
	relationships: Relationships
	
}
export type Attributes = {
	title: string,

    isAccessible: boolean,
    stringRepresentation: string,
    lastModifiedAt: null,
    xmlBackupFile: string,
    accessConstraints: string,
    fees: string,
    useLimitation: string,
    licenseSourceNote: string,
    //dateStamp:Date,
    fileIdentifier: string,
    abstract: string,
    isActive: boolean,
    version: string,
            

	
}
export type Relationships = {
	
	layers:{
		meta:{
			count:number,
		},
		data:[Layers],
	},
            

	
}

export type Layers = {
	
	type:string,
	id:string,
	

}


type UsersType = Array<WmsType>

const Users = (props: any) => {
	const [users, setUsers] = React.useState<UsersType>([])



	React.useEffect(() => {
		axios
		  .get("https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/")
		  .then(response => setUsers(response.data.data))
		  .catch(error => console.log({ error }));
	  }, []);

	return (
		<div className="users">
			<h1>WMSs List</h1>
			{/* <Link to="/users/new" state={{from: "all users", userName: "Bikashweb"}}>
				Add a new user
			</Link> */}
			<div className="users__list">
				{users &&
					users.map((user) => (
						//single user card
						<div className="users__card" key={user.id}>
							<Link to={`/users/${user.id}`}>
								<p>
								
									<span className="normal">{user.attributes.title}{"---("}{user.relationships.layers.meta.count}{")"}</span>
								</p>
							</Link>
						</div>
					))}
			</div>
		</div>
	)
}

export default Users
