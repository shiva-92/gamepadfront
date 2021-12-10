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

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (param) => {
    if (param) {
      setToken(param);
      Cookies.set("token", param);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };
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
        <Route path="/collection" element={<Collection token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
