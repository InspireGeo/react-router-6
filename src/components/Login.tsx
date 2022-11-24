import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from 'react-bootstrap/Button';


function Login() {
  const [loggedin, setLoggedIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/dashboard");
    }
  }, []);

  async function login() {
    let item = { username, password };

    let result = await fetch(
      "https://mrmap.geospatial-interoperability-solutions.eu/api/v1/accounts/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
        },
        mode: "cors",
        body: JSON.stringify({
          data: {
            attributes: {
              password: password,
              username: username,
            },
            type: "LoginRequest",
          },
        }),
      }
    );



	if(result.status === 200){

		result = await result.json();

		localStorage.setItem("user-info", JSON.stringify(result));

		navigate("/dashboard");
	}else{ localStorage.removeItem("user-info"); navigate("/denied");}
    
  }
  return (
    <div>
      <h1>Login Page</h1>
      <br />
      <div className="col-sm-6 offset-sm-3">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
        ></input>
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        ></input>
        <br />
        <Button variant="primary" onClick={login}>Login</Button>
      
      </div>
    </div>
  );
}

export default Login;
