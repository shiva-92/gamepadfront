import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordconfirm] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const handleUsername = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };

  const handleEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const handlePasswordconfirm = (event) => {
    console.log(event.target.value);
    setPasswordconfirm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:3000/create", {
      email: mail,
      password: password,
      username: username,
    });
    console.log(response.data.token);
    setUser(response.data.token);

    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="titlesignup">SIGN UP</div>

        <form onSubmit={handleSubmit} className="ok">
          <input onChange={handleUsername} placeholder="Username" type="text" />
          <input onChange={handleEmail} placeholder="email" type="text" />
          <input onChange={handlePassword} placeholder="password" type="text" />
          <input
            onChange={handlePasswordconfirm}
            placeholder="confirm password"
            type="text"
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
