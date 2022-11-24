import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ServiceContex } from "../Routes";
import Accordion from "react-bootstrap/Accordion";
import { KeywordSyntaxKind } from "typescript";


export type WmssType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
};


export type Attributes = {
  title: string;

  isAccessible: boolean;
  stringRepresentation: string;
  lastModifiedAt: null;
  xmlBackupFile: string;
  accessConstraints: string;
  fees: string;
  useLimitation: string;
  licenseSourceNote: string;
  //dateStamp:Date,
  fileIdentifier: string;
  abstract: string;
  isActive: boolean;
  version: string;
};


export type Relationships = {
  layers: {
    meta: {
      count: number;
    };
    data: [Layers];
  };

  keywords: {
    meta: {
      count: number;
    };
    data: [Keywords];
  };
};



export type Layers = [
  {
    type: string;
    id: string;
  }
];

export type includedLayers = [
  {
    type: string;
    id: string;
    attributes: includedLayersAttributes;
  }
];

export type includedLayersAttributes = {
  title: string,
  name:string,
};






export type Keywords = [
  {
    type: string;
    id: string;
  }
];

export type includedKeywords = [
  {
    type: string;
    id: string;
    attributes: includedKeywordsAttributes;
  }
];

export type includedKeywords2 = [
  {
    type: string;
    id: string;
   
  }
];

export type includedKeywordsAttributes = {
  stringRepresentation: string,
  keyword: string,
};


export type OrganizationType = {
  id: number;
  type: string;
  attributes: OrgaAttributes;
  
};


export type OrgaAttributes = {
  stringRepresentation: string,
  name: string,
};

type WmsType = Array<WmssType>;
//type Layer = Array<Layers>

const Wmss = () => {
  const location = useLocation();
  const params = useParams();

  const [wmss, setWmss] = React.useState<WmsType>([]);
  
  //const [layers, setLayers] = React.useState<Layer>([])
  const [pagenumber, setPagenumber] = React.useState<number>(1);
  const [totalpagenumber, setTotalPagenumber] = React.useState<number>(0);
  const [wmsid, setWmsid] = React.useState<any>("");

  const context = useContext(ServiceContex);
  const [wmsupdated, setWmsUpdated] = React.useState<number>(0);
  const [count, setCount] = React.useState(0);
  //console.log(context)
  
  const [wmsCapabilities, setwmsCapabilities] = useState("");


  type OrgaType = Array<OrganizationType>;
  const [organizations, setOrganizations] = React.useState<OrgaType>([]);
  const [orgaId, setOrgaId] = useState("1");




  React.useEffect(() => {
    //console.log("location from new page", location.state)
    if (location.state) {
      let _state = location.state as any;
      //setPagenumber(_state)
      //console.log(_state)
    }
    //console.log(location.state)
  }, [location.state]);


  React.useEffect(() => {
    axios
      .get(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/?page[size]=5&page[number]=${pagenumber}`
      )
      .then((response) =>
        setTotalPagenumber(Math.ceil(response.data.meta.pagination.count / 5))
      )
      .catch((error) => console.log({ error }));
  }, [totalpagenumber, count, pagenumber]);

  React.useEffect(() => {
    axios
      .get(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/?page[size]=5&page[number]=${pagenumber}`
      )
      .then((response) => setWmss(response.data.data))
      .catch((error) => console.log({ error }));
  }, [pagenumber, count]);

  function deleteWms(wmsid: any) {
    const r = window.confirm(`Do you really want to DELETE ${wmsid} ?`);
    if (r == true) {
      var encodedData = window.btoa("mrmap:mrmap");

      fetch(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/${wmsid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Basic " + encodedData,
          },
        }
      )
        .then((response) => response.json())
        .then(() => {
          setWmsUpdated(wmsupdated + 1);
        });

      window.alert(`WMS:  ${wmsid} is deleted`);
    }
    setCount(count + 1);
  }

  const handlePageClick = (data: any) => {
    setPagenumber(data.selected + 1);
  };

  const openInNewTab = (url: any) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  async function insertWms() {
    var encodedData = window.btoa("mrmap:mrmap");

    if (wmsCapabilities.length == 0) {
      alert("WMS Capabilities field is required and cannot be empty");
      return false;
    }
    let result = await fetch(
      "https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          Authorization: "Basic " + encodedData,
        },

        mode: "cors",
        body: JSON.stringify({
          data: {
            attributes: {
              getCapabilitiesUrl: wmsCapabilities,
              collectMetadataRecords: true,
            },
            relationships: {
              owner: { data: { type: "Organization", id: orgaId} },
            },
            type: "WebMapService",
          },
        }),
      }
    
    );
  
    if (result.status === 202) {
      alert("WMS ist registriert");
    } else {
      alert("invalid WMS Capabilities address");
    }
  }

 
  React.useEffect(() => {
    axios
      .get(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/accounts/organizations/`
      )
      .then((response) => setOrganizations(response.data.data))
      .catch((error) => console.log({ error }));
  }, []);



 


  return (
    <div className="containers">
      <h1>WMSs List</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>wmsID</th>
            <th>TITLE</th>
            <th>ABSTRACT</th>
            <th>LAYERS</th>
            <th>EDIT</th>
            <th>DELETE</th>
            <th>MAP</th>
          </tr>
        </thead>
        <tbody>
          {wmss &&
            wmss.map((wms, i) => (
              <tr key={i}>
                <td>{wms.id}</td>
                <td>{wms.attributes.title}</td>
                <td>{wms.attributes.abstract}</td>
                <td>
                  <Link to={`/wms/${wms.id}`} /* state={{from:pagenumber}}  */>
                    {wms.attributes.title}
                    {"---"}
                    <button className="btn btn-info btn-sm">
                      {wms.relationships.layers.meta.count}
                    </button>
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/wms/edit/${wms.id}`} /* state={{from:pagenumber}}  */
                  >
                    <button className="btn btn-info btn-sm">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteWms(wms.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/reactmap`} /* state={{from:pagenumber}}  */>
                    <button className="btn btn-success">Map</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={totalpagenumber}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />

      <br />
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header>WMS Registry</Accordion.Header>
          <Accordion.Body>
            <div>
              {" "}
              <input
                type="text"
                placeholder="wmsCapabilities"
                size={80}
                onChange={(e) => setwmsCapabilities(e.target.value)}
                className="form-control"
              ></input>
             
              <select   className="form-select"  onChange={(e) => setOrgaId(e.target.value)}>
                {organizations.map((organization,i) => (
                  <option key={i} value={organization.id}>
                    {organization.attributes.name}
                  </option>
                ))}
              
              </select>
              <button className="btn btn-success" onClick={insertWms}>
                Add Wms
              </button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Wmss;
