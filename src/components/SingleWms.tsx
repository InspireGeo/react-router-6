import React,{useContext} from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";

import { WmssType } from "./Wms";
import { Layers } from "./Wms";
import { ServiceContex } from "../Routes";
const SingleWms = () => {
  const params = useParams();
 // console.log('params: ',params)


  const [wms, setWms] = React.useState<WmssType>();

  const [layer, setLayer] = React.useState<Layers>();

  const location = useLocation();
 
  //const [pagenumber, setPagenumber] = React.useState(location.state)

{/* React.useEffect(() => {
 setPagenumber(parseInt(location.state))

}, []);*/}

 



  React.useEffect(() => {
    const singleWmsApiUrl = `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/${params.wmsId}`;
    axios
      .get(singleWmsApiUrl)
      .then((response) => setWms(response.data.data))
      .catch((error) => console.log({ error }));
    //console.log("params",params);
  }, [params]);

  React.useEffect(() => {
    const singleWmsApiUrl = `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/${params.wmsId}`;
    axios
      .get(singleWmsApiUrl)
      .then((response) => setLayer(response.data.data.layers.data))
      .catch((error) => console.log({ error }));
    //console.log("params",params);
  }, [params]);

  

  return (
    <>
      <Link to="/wms" state={{from:location.state}}>Go back</Link>
      {wms && (
        <div className="users__card" key={wms.id}>
          <p>
            Id:
            <span className="normal">{wms.id}</span>
          </p>

          <p>
            Type:
            <span className="normal">{wms.type}</span>
          </p>
          <p>
            Server Name:
            <span className="normal">{wms.attributes.title}</span>
          </p>
          <p>
            isAccessible:
            <span className="normal">{wms.attributes.isAccessible}</span>
          </p>
          <p>
            stringRepresentation:
            <span className="normal">
              {wms.attributes.stringRepresentation}
            </span>
          </p>
          <p>
            lastModifiedAt:
            <span className="normal">{wms.attributes.lastModifiedAt}</span>
          </p>
          <p>
            xmlBackupFile:
            <span className="normal">{wms.attributes.xmlBackupFile}</span>
          </p>
          <p>
            accessConstraints:
            <span className="normal">{wms.attributes.accessConstraints}</span>
          </p>
          <p>
            fees:
            <span className="normal">{wms.attributes.fees}</span>
          </p>
          <p>
            useLimitation::
            <span className="normal">{wms.attributes.useLimitation}</span>
          </p>
          <p>
            licenseSourceNote:
            <span className="normal">{wms.attributes.licenseSourceNote}</span>
          </p>
          <p>
            fileIdentifier:
            <span className="normal">{wms.attributes.fileIdentifier}</span>
          </p>
          <p>
            abstract:
            <span className="normal">{wms.attributes.abstract}</span>
          </p>
          <p>
            isActive:
            <span className="normal">{wms.attributes.isActive}</span>
          </p>
          <p>
            version:
            <span className="normal">{wms.attributes.version}</span>
          </p>

          <p>
            layers:
            <span className="normal">
              {wms.relationships.layers.data[0].id}
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
  );
};

export default SingleWms;
