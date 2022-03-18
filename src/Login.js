import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(`${backendHost}/sign`, {
      email: mail,
      password: password,
    });
    console.log(response.data.token);
    setUser(response.data.token);
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="titlesignup">LOGIN</div>

        <form onSubmit={handleSubmit} className="formcontainer">
          <input onChange={handleEmail} placeholder="email" type="text" />
          <input onChange={handlePassword} placeholder="password" type="text" />

          <button type="submit">Se connecter</button>
        </form>
      </div>
    </>
  );
};

export default Login;
