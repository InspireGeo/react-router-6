import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ServiceContex } from "../Routes";
import Accordion from "react-bootstrap/Accordion";




export type OrganizationType = {
  id: number;
  type: string;
  attributes: OrgaAttributes;
  
};


export type OrgaAttributes = {
  stringRepresentation: string,
  name: string,
};



const Organisation = () => {
  const location = useLocation();
  const params = useParams();

  //const [layers, setLayers] = React.useState<Layer>([])
  const [pagenumber, setPagenumber] = React.useState<number>(1);
  const [totalpagenumber, setTotalPagenumber] = React.useState<number>(0);

  const [count, setCount] = React.useState(0);
  //console.log(context)
  const [orgaName, setOrgaName] = useState("");


  type OrgaType = Array<OrganizationType>;
  const [organizations, setOrganizations] = React.useState<OrgaType>([]);




 
   

  React.useEffect(() => {
    axios
      .get(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/accounts/organizations/?page[size]=10&page[number]=${pagenumber}`
      )
      .then((response) =>
        setTotalPagenumber(Math.ceil(response.data.meta.pagination.count / 10))
      )
      .catch((error) => console.log({ error }));
  }, [totalpagenumber, count, pagenumber]);

  React.useEffect(() => {
    axios
      .get(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/accounts/organizations/?page[size]=10&page[number]=${pagenumber}`
      )
      .then((response) => setOrganizations(response.data.data))
      .catch((error) => console.log({ error }));
  }, [pagenumber, count]);



  const handlePageClick = (data: any) => {
    setPagenumber(data.selected + 1);
  };



  async function insertOrganisation() {
    var encodedData = window.btoa("mrmap:mrmap");

    if (orgaName.length == 0) {
      alert("Organisation Capabilities field is required and cannot be empty");
      return false;
    }
    let result = await fetch(
      "https://mrmap.geospatial-interoperability-solutions.eu/api/v1/accounts/organizations/",
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
                stringRepresentation: "Testorganization4", 
                name: orgaName,
            },
            type: "Organization",
          
          },
        }),
      }
    );

    if (result.status === 201) {
      alert("Organisation ist registriert");
    } else {
      alert("invalid Organisation Capabilities address");
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



  function deleteOrga(orgaid: any) {
    const r = window.confirm(`Do you really want to DELETE ${orgaid} ?`);
    if (r == true) {
      var encodedData = window.btoa("mrmap:mrmap");

      fetch(
        `https://mrmap.geospatial-interoperability-solutions.eu/api/v1/accounts/organizations/${orgaid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Basic " + encodedData,
          },
        }
      )
        .then((response) => response.json())
        /* .then(() => {
          setWmsUpdated(wmsupdated + 1);
        }) */;

      window.alert(`Organisation:  ${orgaid} is deleted`);
    }
    setCount(count + 1);
  }


  return (
    <div className="containers">
      <h1>Organizations List</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Org.ID</th>
            <th>NAME</th>
            
        
            
            <th>DELETE</th>
        
          </tr>
        </thead>
        <tbody>
          {organizations &&
            organizations.map((orga, i) => (
              <tr key={i}>
                <td>{orga.id}</td>
                <td>{orga.attributes.name}</td>
               
                
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteOrga(orga.id)}
                  >
                    Delete
                  </button>
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
          <Accordion.Header>Add Organization</Accordion.Header>
          <Accordion.Body>
            <div>
              {" "}
              <input
                type="text"
                placeholder="Organization Name"
                size={80}
                onChange={(e) => setOrgaName(e.target.value)}
                className="form-control"
              ></input>
              <button className="btn btn-success" onClick={insertOrganisation}>
                Add Organization
              </button>
              {/* <select >
                {organizations.map((organization,i) => (
                  <option key={i} value={organization.attributes.name}>
                    {organization.attributes.name}
                  </option>
                ))}
              
              </select> */}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Organisation;
