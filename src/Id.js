import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Id = ({ token }) => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState();
  const [reviews, setReviews] = useState("");
  const navigate = useNavigate();

  console.log(id);
  console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=1804fba238364ea59c70ba67e4ba4d18`
      );
      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    fetchData();

    const fetchDataone = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}/game-series?key=1804fba238364ea59c70ba67e4ba4d18`
      );
      setGames(response.data);
      console.log(response.data);
    };
    fetchDataone();

    const fetchDatatwo = async () => {
      const response = await axios.post(
        `http://localhost:3000/recuperecommentaire`,
        {
          testid: id,
        }
      );
      console.log(response.data);
      setReviews(response.data);
    };
    fetchDatatwo();
  }, []);

  const handlereview = () => {
    if (token) {
      navigate(`/review/${id}`);
    }
  };

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="gamedetail">
        <div className="visualdetail">
          <div>{data.name}</div>
          <img src={data.background_image} className="gamedetailpic" />
        </div>

        <div className="textdetail">
          <div className="plateformes">
            <div>PLATFORMS</div>
            {data.platforms.map((elem, index) => {
              return <div>{elem.platform.name}</div>;
            })}
          </div>

          <span>{`Date de sortie : ` + `${data.released}`}</span>
          <span>{`Développeurs : ` + `${data.developers[0].name}`}</span>

          <div className="genre">
            <div>GENRES</div>
            {data.genres.map((elemgenre, index) => {
              return <span>{`${elemgenre.name}` + ` `}</span>;
            })}
          </div>

          <button className="buttonreview" onClick={handlereview}>
            DONNE TON AVIS SUR CE JEU
          </button>
        </div>
      </div>

      <div className="globalrelatedgames">
        {games &&
          games.results.map((elem, index) => {
            return (
              <div className="relatedgame">
                <div>{elem.name}</div>
                <img className="relatedgamepic" src={elem.background_image} />
              </div>
            );
          })}
      </div>

      {reviews &&
        reviews.map((elem, index) => {
          return (
            <>
              <div>{elem.titrereview}</div>
            </>
          );
        })}
    </>
  );
};

export default Id;
