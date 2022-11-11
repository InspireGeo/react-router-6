import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ServiceContex } from "../Routes";

export type WFSType = {
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
  featuretypes: {
    meta: {
      count: number;
    };
    data: [FeatureTypes];
  };
};

export type FeatureTypes = [
  {
    type: string;
    id: string;
  }
];

type WfssType = Array<WFSType>;
//type FeatureType = Array<FeatureTypes>

const Wfss = () => {
  const [wfss, setWfss] = React.useState<WfssType>([]);
  //const [features, setFeatures] = React.useState<FeatureType>([])
  const [pagenumber, setPagenumber] = React.useState<number>(1);
  const [totalpagenumber, setTotalPagenumber] = React.useState<number>(0);

  const context = useContext(ServiceContex);
  const [wfsupdated, setWfsUpdated] = React.useState<number>(0);
  const [count, setCount] = React.useState(0);
  //console.log(context)

  React.useEffect(() => {
    axios
      .get(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wfs/?page[size]=5&page[number]=${pagenumber}`
      )
      .then((response) =>
        setTotalPagenumber(Math.ceil(response.data.meta.pagination.count / 5))
      )
      .catch((error) => console.log({ error }));
  }, [totalpagenumber,count]);

  React.useEffect(() => {
    axios 
      .get(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wfs/?page[size]=5&page[number]=${pagenumber}`
      )
      .then((response) => setWfss(response.data.data))
      .catch((error) => console.log({ error }));
  }, [pagenumber,count]);



  function deleteWfs(wfsid: any) {
    const r = window.confirm(`Do you really want to DELETE ${wfsid} ?`);
    if (r == true) {


      var encodedData = window.btoa("mrmap:mrmap");

      fetch(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wfs/${wfsid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Basic " + encodedData,
          },
        }
      )
        .then((response) => response.json())
       
 
   
      
        window.alert(`WFS:  ${wfsid} is deleted`);
        //refreshPage();
    }
   
    setCount(count+1)
   
   
  }

  const handlePageClick = (data: any) => {
    setPagenumber(data.selected + 1);
  };

  return (
    <div className="containers">
      <h1>WFSs List</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>wfsID</th>
            <th>TITLE</th>
            <th>ABSTRACT</th>
            <th>LAYERS</th>
            <th>EDIT</th>
            <th>DELETE</th>
            <th>MAP</th>
          </tr>
        </thead>
        <tbody>
          {wfss &&
            wfss.map((wfs, i) => (
              <tr key={i}>
                <td>{wfs.id}</td>
                <td>{wfs.attributes.title}</td>
                <td>{wfs.attributes.abstract}</td>
                <td>
                
                  <Link to={`/wfs/${wfs.id}`} state={{ from: pagenumber }}>
                    <p>
                      <span className="normal">
                        {wfs.attributes.title}
                        {"---"}
                       
                      </span>

                      <button className="btn btn-info btn-sm">
                        {wfs.relationships.featuretypes.meta.count}
                      </button>
                    </p>
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/wfs/edit/${wfs.id}`} /* state={{from:pagenumber}}  */
                  >
                    <button className="btn btn-info btn-sm">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteWfs(wfs.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/map`} /* state={{from:pagenumber}}  */>
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
    </div>
  );
};

export default Wfss;
