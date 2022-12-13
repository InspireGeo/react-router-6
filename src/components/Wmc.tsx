import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ServiceContex } from "../Routes";
import Accordion from "react-bootstrap/Accordion";
import { KeywordSyntaxKind } from "typescript";

export type WmcsType = {
  id: number;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
};

export type Attributes = {
  title: string;

  stringRepresentation: string;
  ogcMapcontextUrl: string;

  language: null;
  abstract: string;
  pixelWidth: string;
  pixelHeight: string;
  mmPerPixel: string;
  bbox: string;
};

export type Relationships = {
  mapContextLayers: {
    meta: {
      count: number;
    };
    data: [Layers];
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
  title: string;
  identifier: string;
  stringRepresentation: string;

  layerScaleMin: string;
  layerScaleMax: string;
  previewImage: string;
  renderingActive: boolean;
  selectionActive: boolean;
  description: string;
  lft: number;
  rght: number;
  treeId: number;
  level: number;
};

export type includedKeywordsAttributes = {
  stringRepresentation: string;
  keyword: string;
};

type WmcType = Array<WmcsType>;
//type Layer = Array<Layers>

const Wmcs = () => {
  const location = useLocation();
  const params = useParams();

  const [wmcs, setWmcs] = React.useState<WmcType>([]);

  //const [layers, setLayers] = React.useState<Layer>([])
  const [pagenumber, setPagenumber] = React.useState<number>(1);
  const [totalpagenumber, setTotalPagenumber] = React.useState<number>(0);
  const [wmsid, setWmsid] = React.useState<any>("");

  const context = useContext(ServiceContex);
  const [wmsupdated, setWmsUpdated] = React.useState<number>(0);
  const [count, setCount] = React.useState(0);
  //console.log(context)

  const [wmsCapabilities, setwmsCapabilities] = useState("");

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
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/mapcontexts/?page[size]=5&page[number]=${pagenumber}`
      )
      .then((response) =>
        setTotalPagenumber(Math.ceil(response.data.meta.pagination.count / 5))
      )
      .catch((error) => console.log({ error }));
  }, [totalpagenumber, count, pagenumber]);

  React.useEffect(() => {
    axios
      .get(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/mapcontexts/?page[size]=5&page[number]=${pagenumber}`
      )
      .then((response) => setWmcs(response.data.data))
      .catch((error) => console.log({ error }));
  }, [pagenumber, count]);

  /*   function deleteWms(wmsid: any) {
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
  } */

  const handlePageClick = (data: any) => {
    setPagenumber(data.selected + 1);
  };

  const openInNewTab = (url: any) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /*   async function insertWms() {
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
              owner: { data: { type: "Organization"} },
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
  } */

  return (
    <div className="containers">
      <h1>WMCs List</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>wmcID</th>
            <th>TITLE</th>
            <th>ABSTRACT</th>
            <th>LAYERS</th>
            <th>EDIT</th>
            <th>DELETE</th>
            <th>MAP</th>
          </tr>
        </thead>
        <tbody>
          {wmcs &&
            wmcs.map((wmc, i) => (
              <tr key={i}>
                <td>{wmc.id}</td>
                <td>{wmc.attributes.title}</td>
                <td>{wmc.attributes.abstract}</td>
                <td>
                  <Link to={`/wmc/${wmc.id}`} /* state={{from:pagenumber}}  */>
                    {wmc.attributes.title}
                    {"---"}
                    <button className="btn btn-info btn-sm">
                      {wmc.relationships.mapContextLayers.meta.count}
                    </button>
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/wmc/edit/${wmc.id}`} /* state={{from:pagenumber}}  */
                  >
                    <button className="btn btn-info btn-sm">Edit</button>
                  </Link>
                </td>
                <td>
                  {/* <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteWms(wms.id)}
                  >
                    Delete
                  </button> */}
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
     
    </div>
  );
};

export default Wmcs;
