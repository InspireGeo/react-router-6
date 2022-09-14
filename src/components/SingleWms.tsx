import React from 'react'
import axios from 'axios'
import {
	useParams,
	Link,
} from 'react-router-dom'

import { WmsType } from './Wms'
import { Layers } from './Wms' 

const SingleUser = () => {
	const params = useParams()

	const [user, setUser] =
		React.useState<WmsType>()

	
	// const [layer, setLayer] =
	// 	React.useState<Layers>()

		



	React.useEffect(() => {
		const singleUserApiUrl = `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/${params.userId}`
		axios
		  .get(singleUserApiUrl)
		  .then(response => setUser(response.data.data))
		  .catch(error => console.log({ error }));
		  //console.log("params",params);
	  }, [params]);
	
	//   React.useEffect(() => {
	// 	const singleUserApiUrl = `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/${params.userId}`
	// 	axios
	// 	  .get(singleUserApiUrl)
	// 	  .then(response => setLayer(response.data.data.layers.data))
	// 	  .catch(error => console.log({ error }));
	// 	  //console.log("params",params);
	//   }, [params]);


	return (
		<>
			<Link to='/users'>Go back</Link>
			{user && (
				<div
					className='users__card'
					key={user.id}>
					<p>
						Id:
						<span className='normal'>
							{user.id}
						</span>
					</p>

					<p>
						Type:
						<span className='normal'>
							{user.type}
						</span>
					</p>
					<p>
						Server Name:
						<span className='normal'>
							{user.attributes.title}
						</span>
					</p>
					<p>
					    isAccessible:
						<span className='normal'>
							{user.attributes.isAccessible}
						</span>
					</p>
					<p>
					stringRepresentation:
						<span className='normal'>
							{user.attributes.stringRepresentation}
						</span>
					</p>
					<p>
					lastModifiedAt:
						<span className='normal'>
							{user.attributes.lastModifiedAt}
						</span>
					</p>
					<p>
					xmlBackupFile:
						<span className='normal'>
							{user.attributes.xmlBackupFile}
						</span>
					</p>
					<p>
					accessConstraints:
						<span className='normal'>
							{user.attributes.accessConstraints}
						</span>
					</p>
					<p>
					fees:
						<span className='normal'>
							{user.attributes.fees}
						</span>
					</p>
					<p>
					useLimitation::
						<span className='normal'>
							{user.attributes.useLimitation}
						</span>
					</p>
					<p>
					licenseSourceNote:
						<span className='normal'>
							{user.attributes.licenseSourceNote}
						</span>
					</p>
					<p>
					fileIdentifier:
						<span className='normal'>
							{user.attributes.fileIdentifier}
						</span>
					</p>
					<p>
					abstract:
						<span className='normal'>
							{user.attributes.abstract}
						</span>
					</p>
					<p>
					isActive:
						<span className='normal'>
							{user.attributes.isActive}
						</span>
					</p>
					<p>
					version:
						<span className='normal'>
							{user.attributes.version}
						</span>
					</p>
					
					<p>
					layers:
						<span className='normal'>


						{user.relationships.layers.data[0].id}
						

						</span>
					</p>
			      

			       


				</div>
			)}

{/* 			 
            {layer &&
					layer.map((layer) => (
						//single user card
						<div className="users__card" key={layer.id}>
							
									<span className="normal">{user.attributes.title}{"---("}{user.relationships.layers.meta.count}{")"}</span>
							
						</div>
					))}



					<p>
					layers:
						<span className='normal'>

							{user.relationships.layers.data[0].id}
						</span>
					</p> */}



			{/* {user && user.relationships.layers.data.map((layer) => (
						//single user card
						<div className="users__card" key={user.id}>
							<Link to={`/users/${user.id}`}>
								<p>
								
									<span className="normal">{user.attributes.title}{"("}{user.relationships.layers.meta.count}{")"}</span>
								</p>
							</Link>
						</div>
					))} */}
		</>
	)
}

export default SingleUser
