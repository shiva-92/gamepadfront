import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Review = ({ token }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const handletitlereview = (event) => {
    setTitle(event.target.value);
  };

  const handletextreview = (event) => {
    setText(event.target.value);
  };

  console.log(token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/reviewpost", //envoyer commentaires en base de donnéee
      //tu lui envoi objet dans parametre
      {
        reviewtitle: title, //tu vas mettre dans champ email
        reviewtext: text, //tu vas mettre dans champ hash
        tokentest: token,
        idnum: id, //marqueur
        //sauvegarder ces infos dans base de donnée tu fais passer par objet
      }
    );
    //qu'est ce que tu fais avec response recupere ce qui a été pondu

    //fonction qui met valeur à l'interieur de cookie

    //execute l'interieur de setUser avec cette valeur affecté à variable param
    //execute interieur de fonction setUser recu dans parametre avec response.data.token en argument
    console.log(response.data);
    navigate("/");
  };

  return (
    <>
      <div className="containerform">
        <form onSubmit={handleSubmit}>
          {/* //au clic sur le bouton dans le form */}
          <div>Title review</div>
          <input
            onChange={handletitlereview}
            type="text"
            className="widthinput"
          />
          <div>Title text</div>

          <textarea
            onChange={handletextreview}
            className="widthinput"
            name="message"
            id="message"
            cols="30"
            rows="10"
          />
          <br />
          <button>ENVOYER</button>
        </form>
      </div>
    </>
  );
};

export default Review;
