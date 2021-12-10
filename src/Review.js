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
    const response = await axios.post("http://localhost:3000/reviewpost", {
      reviewtitle: title,
      reviewtext: text,
      tokentest: token,
      idnum: id,
    });
    console.log(response.data);
    navigate("/");
  };

  return (
    <>
      <div className="containerform">
        <form onSubmit={handleSubmit}>
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
