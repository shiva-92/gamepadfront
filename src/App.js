import "./App.css";
import Games from "./Games";
import Id from "./Id";
import Header from "./Header";
import Signup from "./Signup";
import Login from "./Login";
import Collection from "./Collection";
import Review from "./Review";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

//recuperer ceux qui ont ca dans le document
//definir fonction qui définit un state, facon d'envoyer un state ici (de signup)
function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (param) => {
    // Cookies.set("token", param); //param=response.data.token
    //cookie tu lui met l'interieur qu'il y a dans param
    if (param) {
      setToken(param); //dans un state token tu met token retourné (lors de l'inscription)
      Cookies.set("token", param);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };
  //token dans state -> pr affichage dynamique
  //token dans cookie -> quand tu reviens, state il considere ce qu'il y avait ds le cookie
  //si y'a un cookie dans token c'est que t'es connecté
  //chaine de caractere (prouve que t'es membre) mis dans cookie,
  return (
    <Router>
      <Header setUser={setUser} token={token} />
      <Routes>
        <Route path="/" element={<Games token={token} />} />
        {/* envoi c'est celui stocké dans le state */}
        <Route path="/games/:id" element={<Id token={token} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/review/:id"
          element={<Review setUser={setUser} token={token} />}
        />
        {/* //execute interieur de ce composant et tu lui donne cet argument, argument sera recupéré par fonction dedans */}
        {/* //argument setUser avec clé setUser il va etre recupéré par fonction signup */}
        {/* a l'interieur de la page / executer ce qu'il y a l'interieur du composant Games */}
        {/* <Route path="/" element={<Actualgames tab={tab} setTab={setTab} />} /> */}
        {/* //tu lui passes ces arguments et ces arguments ils vont être recupérés par la fonction */}
        <Route path="/collection" element={<Collection token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
