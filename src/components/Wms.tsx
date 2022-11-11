import React, { useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ServiceContex } from "../Routes";

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
};

export type Layers = [
  {
    type: string;
    id: string;
  }
];

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

  React.useEffect(() => {
    //console.log("location from new page", location.state)
    if (location.state) {
      let _state = location.state as any;
      //setPagenumber(_state)
      //console.log(_state)
    }
    //console.log(location.state)
  }, [location.state]);

  /* 	 
     if(location.state!=null){
		const pagenumber2=location.state
		console.log(pagenumber2)
	 } */
  /*  React.useEffect(() => {
		axios
		.get(`https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/?page[number]=${pagenumber}`)
		.then(response => setLayers(response.data.data.layers.data))
		  .catch(error => console.log({ error }));
	  }, [wmsNumber]); */

  React.useEffect(() => {
    axios
      .get(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/?page[size]=5&page[number]=${pagenumber}`
      )
      .then((response) =>
        setTotalPagenumber(Math.ceil(response.data.meta.pagination.count / 5))
      )
      .catch((error) => console.log({ error }));
  }, [totalpagenumber,count]);

  React.useEffect(() => {
    axios
      .get(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/registry/wms/?page[size]=5&page[number]=${pagenumber}`
      )
      .then((response) => setWmss(response.data.data))
      .catch((error) => console.log({ error }));
  }, [pagenumber,count]);



 
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
          setWmsUpdated(wmsupdated+1)
        });

       
        
      

        window.alert(`WMS:  ${wmsid} is deleted`);
     
    }
    setCount(count+1)

   
  }

  const handlePageClick = (data: any) => {
    setPagenumber(data.selected + 1);
  };

  const openInNewTab = (url: any) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /*  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/map`; 
    navigate(path);
  }
   */

  return (
    <div className="containers">
      <h1>WMSs List</h1>

      {/* <button disabled={pagenumber===1 ? true : false} onClick={() => setPagenumber((prev) => prev-1)}>Back</button>
			<>{` aktuel seite: ${pagenumber} `}</>
			<button disabled={pagenumber===totalpagenumber ? true : false} onClick={() => setPagenumber((prev) => prev+1)}>Next Page</button>
			 */}

      {/* <div className="users__list">
        {wmss &&
					wmss.map((wms) => (
						//single user card
						<div className="users__card" key={wms.id}>
							<Link to={`/wms/${wms.id}` }  >
								<p>
								
									<span className="normal">{wms.attributes.title}{"---("}{wms.relationships.layers.meta.count}{")"} </span>
								</p>
							</Link>
						</div>
					))} 
      </div>*/}
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

export default Wmss;
