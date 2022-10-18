import React from 'react'
import axios from 'axios'
import {
	useParams,
	Link,
} from 'react-router-dom'
import { FeatureTypes, WFSType } from './Wfs'



const SingleWfs = () => {
	const params = useParams()
	//console.log('params: ',params)

	const [wfs, setWfs] =React.useState<WFSType>()

	const [feature, setFeature] = React.useState<FeatureTypes>();


	

	React.useEffect(() => {
		const singleWfsApiUrl = `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wfs/${params.wfsId}`
		axios
		  .get(singleWfsApiUrl)
		  .then(response => setWfs(response.data.data))
		  .catch(error => console.log({ error }));
		  //console.log("params",params);
	  }, [params]);

	  React.useEffect(() => {
		const singleWfsApiUrl = `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wfs/${params.wfsId}`;
		axios
		  .get(singleWfsApiUrl)
		  .then((response) => setFeature(response.data.data.relationships.featuretypes.data))
		 
		  .catch((error) => console.log({ error }));
		
		//console.log("params",params);
	
	  
	
		
	  }, [params]);

	  const featuresCount=feature?.length;

	return (
		<>
			<Link to='/wfs'>Go back</Link>
			{wfs && (
				<div
					className='users__card'
					key={wfs.id}>
					<p>
						Server Name:
						<span className='normal'>
							{wfs.attributes.title}
						</span>
					</p>
					<p>
						Id:
						<span className='normal'>
							{wfs.id}
						</span>
					</p>

					<p>
						Type:
						<span className='normal'>
							{wfs.type}
						</span>
					</p>
					
					<p>
					    isAccessible:
						<span className='normal'>
							{wfs.attributes.isAccessible}
						</span>
					</p>
					<p>
					stringRepresentation:
						<span className='normal'>
							{wfs.attributes.stringRepresentation}
						</span>
					</p>
					<p>
					lastModifiedAt:
						<span className='normal'>
							{wfs.attributes.lastModifiedAt}
						</span>
					</p>
					<p>
					xmlBackupFile:
						<span className='normal'>
							{wfs.attributes.xmlBackupFile}
						</span>
					</p>
					<p>
					accessConstraints:
						<span className='normal'>
							{wfs.attributes.accessConstraints}
						</span>
					</p>
					<p>
					fees:
						<span className='normal'>
							{wfs.attributes.fees}
						</span>
					</p>
					<p>
					useLimitation::
						<span className='normal'>
							{wfs.attributes.useLimitation}
						</span>
					</p>
					<p>
					licenseSourceNote:
						<span className='normal'>
							{wfs.attributes.licenseSourceNote}
						</span>
					</p>
					<p>
					fileIdentifier:
						<span className='normal'>
							{wfs.attributes.fileIdentifier}
						</span>
					</p>
					<p>
					abstract:
						<span className='normal'>
							{wfs.attributes.abstract}
						</span>
					</p>
					<p>
					isActive:
						<span className='normal'>
							{wfs.attributes.isActive}
						</span>
					</p>
					<p>
					version:
						<span className='normal'>
							{wfs.attributes.version}
						</span>
					</p>

					<p>
            <div>Features: ({featuresCount})</div>
            {feature ?
              feature.map((feature) => (
               
                <div className="users__card" key={feature.id}>
                  <span className="normal">{feature.id}</span>
                </div>
              )):"keine"}
          </p>


				</div>
			)}
		</>
	)
}

export default SingleWfs
