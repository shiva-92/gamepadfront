import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  //composant html qui s'affiche dans la page (jsx) doit etre contenu dans une fonction
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // rappel

  const handleEmail = (event) => {
    console.log(event.target.value); //dans un input, t'as une clé qui recupere ce qui est tapé, ce qui est tapé, tu l'envoie en state
    setEmail(event.target.value); // event target value = a , event target value stocké dans state event target value recupere tout ce qui est tapé, tu stockes event target value dans state, à l'interiru de state, t'auras interieur de event target value
  };

  const handlePassword = (event) => {
    console.log(event.target.value); //dans un input, t'as une clé qui recupere ce qui est tapé, ce qui est tapé, tu l'envoie en state
    setPassword(event.target.value); // event target value = a , event target value stocké dans state event target value recupere tout ce qui est tapé, tu stockes event target value dans state, à l'interiru de state, t'auras interieur de event target value
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/sign",
      //tu lui envoi objet dans parametre
      {
        email: mail, //tu vas mettre dans champ email // recuperer document qui a ce mail (argument), dans ce document qui a l'objet,faire comparaison
        password: password, //tu vas mettre dans champ hash
      }
    );
    console.log(response.data.token); //tu prends le token dans le tableau contenu dans response
    setUser(response.data.token); //t'as ce token la desormais, quand t'arrive sur la page collection, executer interieur de la fonction avec ce token, recuperer document qui ont ce token, les renvoyer, afficher ca dessus
    //fonction qui met valeur à l'interieur de cookie

    //execute l'interieur de setUser avec cette valeur affecté à variable param
    //execute interieur de fonction setUser recu dans parametre avec response.data.token en argument
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="titlesignup">LOGIN</div>

        <form onSubmit={handleSubmit} className="ok">
          <input onChange={handleEmail} placeholder="email" type="text" />
          <input onChange={handlePassword} placeholder="password" type="text" />

          <button type="submit">Se connecter</button>
        </form>
      </div>
    </>
  );
};

export default Login;
