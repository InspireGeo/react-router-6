import React,{useContext} from "react"
import {Link,useLocation,useParams} from "react-router-dom"
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ServiceContex } from "../Routes";
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



const Wmss = () => {
	const location = useLocation();
	const params = useParams();

	const [wmss, setWmss] = React.useState<WmsType>([])
	const [pagenumber, setPagenumber] = React.useState<number>(1)
	const [totalpagenumber, setTotalPagenumber] = React.useState<number>(3)



	const context = useContext(ServiceContex)

	console.log(context)




	React.useEffect(() => {
		//console.log("location from new page", location.state)
		if(location.state){
			let _state=location.state as any
			//setPagenumber(_state)
			console.log(_state)
			
		}
		//console.log(location.state)

	  }, [location.state]); 
  
/* 	 
     if(location.state!=null){
		const pagenumber2=location.state
		console.log(pagenumber2)
	 } */
	 

	React.useEffect(() => {
		axios
		.get(`https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/?page[number]=${pagenumber}`)
		.then(response => setTotalPagenumber(response.data.meta.pagination.pages))
		  .catch(error => console.log({ error }));
	  }, [totalpagenumber]);


	React.useEffect(() => {
		axios
		.get(`https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/?page[number]=${pagenumber}`)
		.then(response => setWmss(response.data.data))
		  .catch(error => console.log({ error }));
	  }, [pagenumber]);



	const handlePageClick =(data:any) =>{

		setPagenumber(data.selected+1)
		
	}
	
	return (
		<div className="users">
			<h1>WMSs List</h1>
			<ReactPaginate

			pageCount={totalpagenumber}
			previousLabel={'previous'}
			nextLabel={'next'}
			breakLabel={'...'}
			marginPagesDisplayed={3}
			pageRangeDisplayed={3}
			onPageChange={handlePageClick}
			containerClassName={'pagination'}
			pageClassName={'page-item'}
			pageLinkClassName={'page-link'}
			previousClassName={'page-item'}
			previousLinkClassName={'page-link'}
			nextClassName={'page-item'}
			nextLinkClassName={'page-link'}
			breakClassName={'page-item'}
			breakLinkClassName={'page-link'}
			activeClassName={'active'}
			
			/>
			{/* <button disabled={pagenumber===1 ? true : false} onClick={() => setPagenumber((prev) => prev-1)}>Back</button>
			<>{` aktuel seite: ${pagenumber} `}</>
			<button disabled={pagenumber===totalpagenumber ? true : false} onClick={() => setPagenumber((prev) => prev+1)}>Next Page</button>
			 */}

			<div className="users__list">
				{wmss &&
					wmss.map((wms) => (
						//single user card
						<div className="users__card" key={wms.id}>
							<Link to={`/wms/${wms.id}` } state={{from:pagenumber}} >
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
