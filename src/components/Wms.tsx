import React from "react"
import {Link} from "react-router-dom"
import axios from "axios";

export type WmssType = {
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


type WmsType = Array<WmssType>

const Wmss = (props: any) => {
	const [wmss, setWmss] = React.useState<WmsType>([])
	const [pagenumber, setPagenumber] = React.useState(1)
  


	React.useEffect(() => {
		axios
		.get(`https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/?page[number]=${pagenumber}`)
		.then(response => setWmss(response.data.data))
		  .catch(error => console.log({ error }));
	  }, [pagenumber]);

	return (
		<div className="users">
			<h1>WMSs List</h1>
			<button onClick={() => setPagenumber((prev) => prev+1)}>Next Page</button>
			<button onClick={() => setPagenumber((prev) => prev-1)}>Back</button>


			<div className="users__list">
				{wmss &&
					wmss.map((wms) => (
						//single user card
						<div className="users__card" key={wms.id}>
							<Link to={`/wms/${wms.id}`}>
								<p>
								
									<span className="normal">{wms.attributes.title}{"---("}{wms.relationships.layers.meta.count}{")"}</span>
								</p>
							</Link>
						</div>
					))}
			</div>
		</div>
	)
}

export default Wmss
