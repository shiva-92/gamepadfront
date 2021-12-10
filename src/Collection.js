import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Collection = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log(token);

      const response = await axios.post(
        `http://localhost:3000/recuperefavori`,
        {
          tokencheck: token,
        }
      );

      setData(response.data);
      setIsLoading(false);
    };
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
