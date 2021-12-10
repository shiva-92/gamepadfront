import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Id = ({ token }) => {
  //bloc d'instruction
  const { id } = useParams(); //executer l'interieur de la fonction dans url //useparams ca permet de mettre parametre dans url dans id
  const [data, setData] = useState(""); //response.data=tableau
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState();
  const [reviews, setReviews] = useState("");
  const navigate = useNavigate();

  console.log(id);
  console.log(token);

  //recuperer documents qui ont ca en token
  //dans ca response tu execute la fonction et tu recupere ce qui est pondu
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
      //dans response c'est un objet qui est pondu
      // setCheck(response.data)
      setGames(response.data);
      console.log(response.data); //games il prends l'objet retourné, dans cet objet, il y a un tableau results, games.results.data on map dessus
    };
    fetchDataone();

    //mettre un marqueur dans l'objet que t'envoie pr que tu le recupere après
    const fetchDatatwo = async () => {
      //dans response tu stock ce qui a été pondu
      const response = await axios.post(
        `http://localhost:3000/recuperecommentaire`,
        //recuperer document qui ont ce token
        {
          testid: id,
        }
      );
      console.log(response.data);
      setReviews(response.data);
      //tu alimentes tout(1) et après tu recupere que tiens(2)

      // setCommentaires(response.data); //ce qui est pondu dans response objet commentaire c'est un objet
      // console.log(response.data); //response objet, response.data traiter objet
      //ajouter commentaire, ca s'empile dans la base de donné
      //recupere commentaire qui ont cet id la et affiche les
    };
    fetchDatatwo();
  }, []);

  const handlereview = () => {
    if (token) {
      navigate(`/review/${id}`); //création de la page /review/4520 a l'interieur de la page executer fonction et où t'auras param qui te permet de recuperer argument dans url
    }
  };

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      {/* //tu vas faire différent truc avec objet dans response, tu peux maper tableau dedans, tu peux afficher valeur clé */}
      <div>
        <div>{data.name}</div>
        <img src={data.background_image} className="gamedetailpic" />
        <div>
          {data.platforms.map((elem, index) => {
            //on va assigenr chaque element du tableau platforms à elem
            //elem il prends le premier indice
            return <span>{elem.platform.name}</span>;
          })}
          <div>
            <span>{data.released}</span>
          </div>
          <span>{data.developers[0].name}</span>
          {/* //developers= tableau [0]=indice 0 du tableau */}
        </div>
        {/* <span>{data.description_raw}</span> */}
        {data.genres.map((elemgenre, index) => {
          //tu mape sur le tableau genres, elem=i il va prendre chaque indice du tableau genre
          //on va assigenr chaque element du tableau platforms à elem
          //elem il prends le premier indice
          return <span>{elemgenre.name}</span>;
        })}
        <div>{data.publishers[0].name}</div>
      </div>

      <button onClick={handlereview}>write review</button>

      {games &&
        games.results.map((elem, index) => {
          //on va assigenr chaque element du tableau platforms à elem
          //elem il prends le premier indice
          return (
            <>
              <div>{elem.name}</div>
              <img src={elem.background_image} />
            </>
          ); //on lui affecte chaque indice du tableau results
        })}

      {/* //objet retourné qui contient commentaire qui ont cet id, dans le commentaire tu injecte marqueur id */}
      {reviews &&
        reviews.map((elem, index) => {
          //on va assigenr chaque element du tableau platforms à elem
          //elem il prends le premier indice
          return (
            <>
              <div>{elem.titrereview}</div>
            </>
          ); //on lui affecte chaque indice du tableau results
        })}
    </>
  );
};

export default Id;
