import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Collection = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(""); //response=objet retourné //response tu le met dans un state et tu map dessus

  useEffect(() => {
    const fetchData = async () => {
      console.log(token);

      const response = await axios.post(
        //dans response tu stock ce qui a été pondu
        `http://localhost:3000/recuperefavori`,
        {
          tokencheck: token,
        }
      );
      //tu alimentes tout(1) et après tu recupere que tiens(2)

      setData(response.data);
      setIsLoading(false);
    }; // on a definit fonction fetchdata dans laquelle on demande à executer l'interieur d'une fonction
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      {data.map((elem, index) => {
        return (
          <>
            <img src={elem.visuelgame} />
            <span>{elem.name}</span>
          </>
        );
      })}
    </>
  );
};

export default Collection;
//recuperer dans une variable tout les documents et tu map dessus
