import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Games = ({ token }) => {
  const [data, setData] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [gametype, setGametype] = useState("");
  const [idgame, setIdgame] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState("");
  const [choix, setChoix] = useState("");

  const [check, setCheck] = useState(1);

  const handleChange = (event) => {
    console.log(event.target.value);
    setGame(event.target.value);
  };

  const handleSelect = () => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/platforms`
      );
      setPlatform(response.data);

      setIsLoading(false);
    };
    fetchData();
  };

  const handleGenre = () => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/genres`);
      setGenre(response.data);

      setIsLoading(false);
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = `${process.env.REACT_APP_HOST}/games?game=${game}&choix=${choix}&gametype=${gametype}&check=${check}`;

      if (idgame) {
        endpoint = endpoint + `&` + `idgame=` + idgame;
      }

      const response = await axios.get(endpoint);

      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [game, choix, idgame, gametype, check]);

  const handlePagenext = () => {
    setCheck(check + 1);

    console.log(check);
  };

  const handlePageprevious = () => {
    setCheck(check - 1);

    console.log("check");
  };

  const handleOrdering = (event) => {
    if (choix === "") {
      setChoix(event.target.value);
    } else {
      setChoix(`-` + event.target.value);
    }
  };

  console.log(token);

  const onChange = (event) => {
    {
      platform &&
        platform.results.map((elemplatformgame, index) => {
          if (elemplatformgame.name === event.target.value) {
            setIdgame(elemplatformgame.id);

            console.log(elemplatformgame.id);
          }
        });
    }
  };

  const onChangegenre = (event) => {
    console.log(event.target.value);
    setGametype(event.target.value);
  };

  const handleFavori = async (photogame, nom, tok) => {
    console.log(photogame);
    console.log(nom);
    console.log(tok);
    const response = await axios.post(`${process.env.REACT_APP_HOST}/favori`, {
      nomphoto: photogame,
      nomgame: nom,
      valeurtoken: tok,
    });
    console.log(response.data);
  };

  return isLoading ? (
    <span>en cours de chargement </span>
  ) : (
    <>
      <div className="choice">
        {/* choice c'est rectangle rouge */}

        {/* navuser c'est rectangle vert, précédent, input, suivant */}

        {data.previous != null ? (
          <div className="navusersecondpage">
            <button className="previous" onClick={handlePageprevious}>
              <FontAwesomeIcon icon={faAngleLeft} size="2x" />
            </button>

            <input
              className="inputgame"
              onChange={handleChange}
              placeholder="Cherchez votre jeu favori !"
            />

            <button className="next" onClick={handlePagenext}>
              <FontAwesomeIcon icon={faAngleRight} size="2x" />
            </button>
          </div>
        ) : (
          <div className="navuserfirstpage">
            <input
              className="inputgame"
              onChange={handleChange}
              placeholder="Cherchez votre jeu favori !"
            />

            <button className="next" onClick={handlePagenext}>
              <FontAwesomeIcon icon={faAngleRight} size="2x" />
            </button>
          </div>
        )}

        <div className="select">
          <select onClick={handleSelect} onChange={onChange}>
            <option>- Choisissez une plateforme -</option>
            {platform &&
              platform.results.map((platformeelem, index) => {
                return <option key={index}>{platformeelem.name}</option>;
              })}
          </select>

          <select onClick={handleGenre} onChange={onChangegenre}>
            <option>- Choisissez un genre -</option>
            {genre &&
              genre.results.map((elemgenre, index) => {
                return <option key={index}>{elemgenre.slug}</option>;
              })}
          </select>

          <select onChange={handleOrdering}>
            <option>- Ordre d'affichage</option>
            <option>released</option>
            <option>rating</option>
            <option>name</option>
          </select>
        </div>
      </div>

      <div className="global">
        {data.results.map((elem, index) => {
          return (
            <div className="game">
              <span className="title">{elem.name}</span>

              <Link to={`/games/${elem.id}`}>
                <img className="pics" src={elem.background_image} />
              </Link>
              <button
                className="favori"
                onClick={() => {
                  if (!token) {
                    alert(
                      "Vous devez être connecté pour ajouter ce jeu à vos favoris"
                    );
                  } else {
                    handleFavori(elem.background_image, elem.name, token);
                  }
                }}
              >
                <FontAwesomeIcon icon={faHeart} size="1x" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Games;
