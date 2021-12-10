//a l'interieur de la page signup, executer interieur du composant signup

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//aller chercher cookie stocké dans le navigateur tu communiques avec navigateur
const Signup = ({ setUser }) => {
  //composant html qui s'affiche dans la page (jsx) doit etre contenu dans une fonction
  const [username, setUsername] = useState("");
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordconfirm] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate(); // rappel

  const handleUsername = (event) => {
    console.log(event.target.value); //dans un input, t'as une clé qui recupere ce qui est tapé, ce qui est tapé, tu l'envoie en state
    setUsername(event.target.value); // event target value = a , event target value stocké dans state event target value recupere tout ce qui est tapé, tu stockes event target value dans state, à l'interiru de state, t'auras interieur de event target value
  };

  const handleEmail = (event) => {
    console.log(event.target.value); //dans un input, t'as une clé qui recupere ce qui est tapé, ce qui est tapé, tu l'envoie en state
    setEmail(event.target.value); // event target value = a , event target value stocké dans state event target value recupere tout ce qui est tapé, tu stockes event target value dans state, à l'interiru de state, t'auras interieur de event target value
  };

  const handlePassword = (event) => {
    console.log(event.target.value); //dans un input, t'as une clé qui recupere ce qui est tapé, ce qui est tapé, tu l'envoie en state
    setPassword(event.target.value); // event target value = a , event target value stocké dans state event target value recupere tout ce qui est tapé, tu stockes event target value dans state, à l'interiru de state, t'auras interieur de event target value
  };

  const handlePasswordconfirm = (event) => {
    console.log(event.target.value); //dans un input, t'as une clé qui recupere ce qui est tapé, ce qui est tapé, tu l'envoie en state
    setPasswordconfirm(event.target.value); // event target value = a , event target value stocké dans state event target value recupere tout ce qui est tapé, tu stockes event target value dans state, à l'interiru de state, t'auras interieur de event target value
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/create",
      //tu lui envoi objet dans parametre
      {
        email: mail, //tu vas mettre dans champ email
        password: password, //tu vas mettre dans champ hash
        username: username, //tu vas mettre dans champ email
      }
    );
    console.log(response.data.token);
    setUser(response.data.token);
    //fonction qui met valeur à l'interieur de cookie

    //execute l'interieur de setUser avec cette valeur affecté à variable param
    //execute interieur de fonction setUser recu dans parametre avec response.data.token en argument
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
