import React, { useContext } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";

import { FeatureTypes, WFSType,includedKeywords } from "./Wfs";

const WfsEdit = () => {
  const params = useParams();
  //console.log('params: ',params)

  const [wfs, setWfs] = React.useState<WFSType>();
  const [title, setTitle] = React.useState<string>("");
  //const [feature, setFeature] = React.useState<FeatureTypes>();
  const [wfsupdated, setWfsUpdated] = React.useState<number>(0);

  const user = localStorage.getItem("user-info");


  const [keyword, setKeyword] = React.useState<includedKeywords>();
  const [keywords, setKeywords] = React.useState([]);




 
  React.useEffect(() => {
    const singleWmsApiUrl = `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wfs/${params.wfsId}/?include=keywords`;
    axios
      .get(singleWmsApiUrl)
      .then((response) => {
        setWfs(response.data.data);
        setTitle(response.data.data.attributes.title);
        setKeyword(response.data.included);
     
      })

      .catch((error) => console.log({ error }));
  }, [params,wfsupdated]);


  function updateWfs() {

    var encodedData = window.btoa("mrmap:mrmap");
    //console.log(title);
    //console.log(wfsid);
    fetch(
      `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wfs/${params.wfsId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          data: {
            type: "WebFeatureService",
            id: params.wfsId,
            attributes: { title: title},
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
          "Content-Length": "4046",
          Origin: "https://mrmap.geospatial-interoperability-solutions.eu",
          Connection: "keep-alive",
          Referer:
            "https://mrmap.geospatial-interoperability-solutions.eu/registry/wfs",

          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          Authorization: "Basic " + encodedData,
        },
      }
    ).then((response) => response.json())
    .then(() => {
      setWfsUpdated(wfsupdated+1)
    })
  }


  return (
    <div className="containers">
      <Link to="/wfs" /* state={{ from: location.state }} */>Go back</Link>
      <div>
        {" "}
        <input

          type="textarea" 
          size={80}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
      
        <button className="btn btn-success"onClick={updateWfs}>Update Wfs</button>
      </div>
      <>
        {wfs && (
          <div className="users__card" key={wfs.id}>
            <p>
              Server Name:
              <span className="normal">{wfs.attributes.title}</span>
            </p>
            <p>
              Id:
              <span className="normal">{wfs.id}</span>
            </p>

            <p>
              Type:
              <span className="normal">{wfs.type}</span>
            </p>

            <p>
              isAccessible:
              <span className="normal">{wfs.attributes.isAccessible}</span>
            </p>
            <p>
              stringRepresentation:
              <span className="normal">
                {wfs.attributes.stringRepresentation}
              </span>
            </p>
            <p>
              lastModifiedAt:
              <span className="normal">{wfs.attributes.lastModifiedAt}</span>
            </p>
            <p>
              xmlBackupFile:
              <span className="normal">{wfs.attributes.xmlBackupFile}</span>
            </p>
            <p>
              accessConstraints:
              <span className="normal">{wfs.attributes.accessConstraints}</span>
            </p>
            <p>
              fees:
              <span className="normal">{wfs.attributes.fees}</span>
            </p>
            <p>
              useLimitation::
              <span className="normal">{wfs.attributes.useLimitation}</span>
            </p>
            <p>
              licenseSourceNote:
              <span className="normal">{wfs.attributes.licenseSourceNote}</span>
            </p>
            <p>
              fileIdentifier:
              <span className="normal">{wfs.attributes.fileIdentifier}</span>
            </p>
            <p>
              abstract:
              <span className="normal">{wfs.attributes.abstract}</span>
            </p>
            <p>
              isActive:
              <span className="normal">{wfs.attributes.isActive}</span>
            </p>
            <p>
              version:
              <span className="normal">{wfs.attributes.version}</span>
            </p>

            <p>
            keywords: 
            {keyword &&
              keyword.map((keywo) => (
                
                  <button className="btn btn-info"  >{keywo.attributes.keyword} </button>
               
               
              ))}
          </p>
          </div>
        )}
      </>
    </div>
  );
};

export default WfsEdit;
