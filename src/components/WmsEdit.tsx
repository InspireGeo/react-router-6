import React, { useContext,useState } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";

import { includedKeywords, includedKeywords2,WmssType } from "./Wms";
import { Keywords } from "./Wms";


const WmsEdit = () => {
  const params = useParams();
  // console.log('params: ',params)

  const [wms, setWms] = React.useState<WmssType>();
  const [title, setTitle] = React.useState<string>("");
 
  const [wmsupdated, setWmsUpdated] = React.useState<number>(0);

  const user = localStorage.getItem("user-info");

  type includedKeywordsType = Array<includedKeywords2>;

  const [keyword, setKeyword] = React.useState<includedKeywordsType>([]);

  const [keywords, setKeywords] = React.useState<includedKeywords>();


  React.useEffect(() => {
    const singleWmsApiUrl = `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/${params.wmsId}/?include=keywords`;
    axios
      .get(singleWmsApiUrl)
      .then((response) => {
        setWms(response.data.data);
        setTitle(response.data.data.attributes.title);
 
        setKeywords(response.data.included);
     
      })

      .catch((error) => console.log({ error }));
  }, [params,wmsupdated]);



  function updateWms() {
   
    var encodedData = window.btoa("mrmap:mrmap");
    //console.log(title);
    fetch(
      `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/${params.wmsId}/?include=keywords`,
      {
        method: "PATCH",
        body: JSON.stringify({
          data: {
            type: "WebMapService",
            id: params.wmsId,
            attributes: {
              title: title,
            },
            /* relationships: {
              keywords: {data:[{type: "Keyword",id:"789"},{type: "Keyword",id:"790"}]},
            },  */
              /* relationships: {
              keywords: {data:{...keyword}},
            },   */
            
          },
        }),
        headers: {
          Host: "mrmap.geospatial-interoperability-solutions.eu",
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",
          Accept: "application/json, text/plain,*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/vnd.api+json",
          "Content-Length": "940",
          Origin: "https://mrmap.geospatial-interoperability-solutions.eu",
          Connection: "keep-alive",
          Referer:
            "https://mrmap.geospatial-interoperability-solutions.eu/registry/wms",

          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          Authorization: "Basic " + encodedData,
        },
      }
    ).then((response) => response.json())
    .then(() => {
      setWmsUpdated(wmsupdated+1)
    })
    //.then((json) => console.log(json));
  }
  

  return (
    
    <div className="containers">
      <Link to="/wms" /* state={{ from: location.state }} */>Go back</Link>
      <div>
        {" "}
        <input
          type="textarea"
          size={80}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
      
        <button className="btn btn-success" onClick={updateWms}>Update Wms</button>
      </div>
      {wms && (
        <div className="users__card" key={wms.id}>
          <p>
            Server Name:
            <span className="normal">{wms.attributes.title}</span>
          </p>
          <p>
            Id:
            <span className="normal">{wms.id}</span>
          </p>

          <p>
            Type:
            <span className="normal">{wms.type}</span>
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
            keywords: 
            {keywords &&
              keywords.map((keywo) => (
                
                  <button className="btn btn-info"  >{keywo.attributes.keyword} </button>
               
               
              ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default WmsEdit;
