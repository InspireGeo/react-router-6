import React, { useContext } from "react"
import {Link} from "react-router-dom"
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ServiceContex } from "../Routes";

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

const Wfss = () => {
	const [wfss, setWfss] = React.useState<WfssType>([])
	const [pagenumber, setPagenumber] = React.useState<number>(1)
	const [totalpagenumber, setTotalPagenumber] = React.useState<number>(0)


    const context = useContext(ServiceContex)

	console.log(context)




	React.useEffect(() => {
		axios
		.get(`https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wfs/?page[number]=${pagenumber}`)
		.then(response => setTotalPagenumber(response.data.meta.pagination.pages))
		  .catch(error => console.log({ error }));
	  }, [totalpagenumber]);


	React.useEffect(() => {
		axios
		  .get(`https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wfs/?page[number]=${pagenumber}`)
		  .then(response => setWfss(response.data.data))
		  .catch(error => console.log({ error }));
	  }, [pagenumber]);

	
	  const handlePageClick =(data:any) =>{

		setPagenumber(data.selected+1)
	}

	return (
		<div className="users">
			<h1>WFSs List</h1>
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
