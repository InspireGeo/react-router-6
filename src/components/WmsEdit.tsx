import React, { useContext } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";

import { WmssType } from "./Wms";
import ProtectedRoutes from "./ProtectedRoutes";


const WmsEdit = () => {
  const params = useParams();
  // console.log('params: ',params)

  const [wms, setWms] = React.useState<WmssType>();
  const [title, setTitle] = React.useState<string>("");
  const [wmsid, setWmsid] = React.useState<any>("");

  const user = localStorage.getItem("user-info");


  React.useEffect(() => {
    const singleWmsApiUrl = `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/${params.wmsId}`;
    axios
      .get(singleWmsApiUrl)
      .then((response) => {
        setWms(response.data.data);
        setTitle(response.data.data.attributes.title);
        setWmsid(response.data.data.id);
      })

      .catch((error) => console.log({ error }));
    //console.log("params",params);
  }, [params,wmsid]);

  function updateWms() {
   
    setWmsid("");
    var encodedData = window.btoa('mrmap:mrmap');
    
    fetch(
      `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/${params.wmsId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          username : "mrmap",
          password : "mrmap",
          data: {
            type: "WebMapService",
            id: "210f2e32-089a-4dfc-a44d-b4d6725f879e",
            attributes: {
              accessConstraints: "noLimitations",
              fees: "geldleistungsfrei, Datenlizenz Deutschland – Namensnennung – Version 2.0, URL: https://www.govdata.de/dl-de/by-2-0",
              title: title,
              abstract:
                "Digitale Topographische Karte 1:5.000 (DTK5) auf der Grundlage von ALKIS und ATKIS (AAA-Modell; ETRS89/UTM32). Die DTK5 nimmt innerhalb der verschiedenen Kartenwerke eine besondere Stellung ein, da sie als Bindeglied zwischen dem Liegenschaftskataster und der Topographie sowohl die Eigentumsstrukturen, Grundstücksnutzungen und Gebäudebestand als auch die bedeutenden topographischen Informationen nachweist.",
              isSearchable: false,
              isActive: false,
            },
            relationships: {
              metadataContact: { data: { type: "MetadataContact", id: "5" } },
              keywords: { data: [] },
              allowedOperations: { data: [] },
              serviceContact: { data: { type: "MetadataContact", id: "5" } },
            },
          },
        }),
        headers: {
          "Host": "mrmap.geospatial-interoperability-solutions.eu",
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",
          "Accept": "application/json, text/plain,*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/vnd.api+json",
           "Content-Length": "940",
          "Origin": "https://mrmap.geospatial-interoperability-solutions.eu",
          "Connection": "keep-alive",
          "Referer":
            "https://mrmap.geospatial-interoperability-solutions.eu/registry/wms",
          
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          'Authorization': 'Basic ' + encodedData
        },
      }
    )
      .then((response) => response.json());
      //.then((json) => console.log(json));

  
  }

  return (
    <div className="containers">
      <Link to="/wms" /* state={{ from: location.state }} */>Go back</Link>
      <div>
        {" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        <button onClick={updateWms}>Update Wms</button>
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
        </div>
      )}
    </div>
  );
};

export default WmsEdit;
