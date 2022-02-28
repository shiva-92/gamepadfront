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
        `${process.env.REACT_APP_HOST}/recuperefavori`,
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
      <div className="global">
        {data.map((elem, index) => {
          return (
            <div className="game">
              <span>{elem.name}</span>

              <img className="pics" src={elem.visuelgame} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Collection;
