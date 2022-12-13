import React, { useContext } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";

import { includedLayers, WmcsType } from "./Wmc";
import { Layers } from "./Wms";
//import { ServiceContex } from "../Routes";
import MapTerrestris from "../reactGeo/MapTerrestris"



const SingleWmc = () => {
  const params = useParams();
  // console.log('params: ',params)

  const [wmc, setWmc] = React.useState<WmcsType>();

  const [layer, setLayer] = React.useState<includedLayers>();
  const [checkedLayer, setcheckedLayer] = React.useState<includedLayers>();
  //const location = useLocation();

  //const [pagenumber, setPagenumber] = React.useState(location.state)

  
    /* React.useEffect(() => {
 setPagenumber(parseInt(location.state))

}, []);*/
  

/*   React.useEffect(() => {
    //console.log("location from new page", location.state)
    if (location.state) {
      let _state = location.state as any;
      //setPagenumber(_state)
      //console.log(_state);
    }
    //console.log(location.state)
  }, [location.state]);
 */
  React.useEffect(() => {
    const singleWmsApiUrl = `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/mapcontexts/${params.wmcId}?include=mapContextLayers`;

    axios
      .get(singleWmsApiUrl)
      .then((response) => {
        setWmc(response.data.data);
        setLayer(response.data.included);
       
      })
      
      
      .catch((error) => console.log({ error }));
    //console.log("params",params);
  }, [params]);

  
  const layersCount = layer?.length;

  const [checked, setChecked] = React.useState<string[]>([]);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    var updatedList =[...checked];
   
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
 

  return (
    <div className="containers">

      <Link to="/wmc" /* state={{ from: location.state }} */>
        Go back
      </Link>

      {wmc && (
        <div className="users__card" key={wmc.id}>
          <p>
            Server Name:
            <span className="normal">{wmc.attributes.title}</span>
          </p>
          <p>
            Id:
            <span className="normal">{wmc.id}</span>
          </p>

          <p>
            Type:
            <span className="normal">{wmc.type}</span>
          </p>
          
          <p>
            Abstract:
            <span className="normal">{wmc.attributes.abstract}</span>
          </p>
          <p>
            stringRepresentation:
            <span className="normal">
              {wmc.attributes.stringRepresentation}
            </span>
          </p>
          <p>
            pixelHeight:
            <span className="normal">{wmc.attributes.pixelHeight}</span>
          </p>
          <p>
            pixelWidth:
            <span className="normal">{wmc.attributes.pixelWidth}</span>
          </p>
          <p>
            language:
            <span className="normal">{wmc.attributes.language}</span>
          </p>
          <p>
           ogcMapcontextUrl:
            <span className="normal">{wmc.attributes.ogcMapcontextUrl}</span>
          </p>
          
        
  
          <p>
            layers: ({layersCount})  <Link to={`/reactmap`}  state={{layerId:checked}}  >
                    <button className="btn btn-success">Map</button>
                  </Link>
            {layer &&
              layer.map((layer) => (
                <div className="users__card" key={layer.id}>

                  <span className="normal"> <input className="form-check-input" type="checkbox" value= {layer.id} id="flexCheckDefault"   onChange={handleCheck}/> {layer.attributes.title}-(layer Id: {layer.id}) - (left: {layer.attributes.lft})- (right: {layer.attributes.rght})- (level: {layer.attributes.level})</span> 
                  
                 </div>
              ))}
          </p>
        </div>
      )}
   </div>
  );
};

export default SingleWmc;
