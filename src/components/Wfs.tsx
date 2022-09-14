import React from "react"
import {Link} from "react-router-dom"
import axios from "axios";

export type WFSType = {
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
	
	featuretypes:{
		meta:{
			count:number,
		}
	},
            

	
}
type WfssType = Array<WFSType>

const Wfss = (props: any) => {
	const [wfss, setWfss] = React.useState<WfssType>([])



	React.useEffect(() => {
		axios
		  .get("https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wfs/")
		  .then(response => setWfss(response.data.data))
		  .catch(error => console.log({ error }));
	  }, []);

	return (
		<div className="users">
			<h1>WFSs List</h1>
			{/* <Link to="/users/new" state={{from: "all users", userName: "Bikashweb"}}>
				Add a new user
			</Link> */}
			<div className="users__list">
				{wfss &&
					wfss.map((user) => (
						//single user card
						<div className="users__card" key={user.id}>
							<Link to={`/wfs/${user.id}`}>
								<p>
                                <span className="normal">{user.attributes.title}{"---("}{user.relationships.featuretypes.meta.count}{")"}</span>

									{/* <span className="normal">{user.attributes.title}</span> */}
								</p>
							</Link>
						</div>
					))}
			</div>
		</div>
	)
}

export default Wfss
