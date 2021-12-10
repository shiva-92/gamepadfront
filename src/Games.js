//interieur de page /
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//tu communiques avec ton navigateur -> cookie reste sur ton navigateur -> tu communique avec ton navigateur de chaque page

const Games = ({ token }) => {
  //la où tu déclare tes states

  //useeffect, lié à ce qui apparait pas sur la page
  const [data, setData] = useState(""); //dans data=[] ->on a mis le tableau, quand on dit data.map (on manipule ce qu'il ya à l'interieur)
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [gametype, setGametype] = useState("");
  const [idgame, setIdgame] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState("");
  const [choix, setChoix] = useState("");

  const [check, setCheck] = useState(1); //1 en num + 1 en num= 2 state=2 c'est un string

  const handleChange = (event) => {
    console.log(event.target.value); //event target value recupere valeur tapée en live, ce qui est recupéré dans event target value tu stockes dans state
    setGame(event.target.value); //metal
  };

  //quand on clique sur select
  const handleSelect = () => {
    // useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/platforms?key=1804fba238364ea59c70ba67e4ba4d18`
      );
      //au lancement, robot qui execute ligne par ligne, la c'est un message a l'egard de robot qui execute les lignes
      setPlatform(response.data); //on manipule ce qu'il y a à l'interieur

      // console.log(platform.results[0].name);
      setIsLoading(false);
    };
    fetchData();
  };

  const handleGenre = () => {
    // useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/genres?key=1804fba238364ea59c70ba67e4ba4d18`
      );
      setGenre(response.data); //on manipule ce qu'il y a à l'interieur //genre il prends tableau

      // console.log(platform.results[0].name);
      setIsLoading(false);
    };
    fetchData();
  };

  //ROUTE 1
  useEffect(() => {
    const fetchData = async () => {
      //dans response, on stock ce qui a été pondu

      let endpoint =
        "https://api.rawg.io/api/games?key=1804fba238364ea59c70ba67e4ba4d18";

      if (game) {
        //input barre de recherche
        //concatener
        endpoint = endpoint + `&` + `search=` + game;
      }

      if (choix) {
        //concatener
        endpoint = endpoint + `&` + `ordering=` + choix;
      }

      if (idgame) {
        //concatener
        endpoint = endpoint + `&` + `platforms=` + idgame;
      }

      if (gametype) {
        endpoint = endpoint + `&` + `genres=` + gametype;
      }

      if (check) {
        endpoint = endpoint + `&` + `page=` + check;
      }
      // if (previouspage) {
      //   endpoint = endpoint + `&` + `page=` + previouspage;
      // }

      // https://api.rawg.io/api/games?key=1804fba238364ea59c70ba67e4ba4d18&page&page=https://api.rawg.io/api/games?key=1804fba238364ea59c70ba67e4ba4d18&page

      // au clic tu actualise le state, quand state actualisé, ca fait requete avec valeur que vient d eprendre state
      const response = await axios.get(
        //on parle au back
        //execute l'interieur de la fonction avec cet argument, (tas pas le droit de mettre api dans le front faut que tu passes par back)

        endpoint
      );

      setData(response.data); //on manipule ce qu'il y a à l'interieur
      //   console.log(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [game, choix, idgame, gametype, check]);
  //tu actualise le code à l'interieur de useeffect à chaque fois que state est actualisé, requete avec ce que le state il vient de prendre
  //ca refait la requete avec le state actualisé, ca fait la requete, ca fait la requete
  //a chaque fois que game actualisé, on refait ce qu'il ya à l'interieur de useeffect (tu tentes la requete avec ca, avec ca)
  //toi tu fais fais ta requete avec state en argument
  //ca tente la requete à chaque fois que state est actualisé useeffect ca permet de faire la requete avec qui est tapé en live dans le state

  //compteur tu initialises à 1  //compteur à 2
  //i=1 //i=
  //au clic

  const handlePagenext = () => {
    setCheck(check + 1); //au clic, check=2

    console.log(check); //1 //1+1 //1+1+1
  };

  const handlePageprevious = () => {
    setCheck(check - 1); //au clic, check=2

    console.log("check"); //1 //1+1 //1+1+1
  };

  const handleOrdering = (event) => {
    // console.log(event.target.value);
    //par défaut t'as rien
    if (choix === "") {
      //t'arrives sur la page, t'as rien fais, tu clic tu vois qu'y a eu aucune action
      setChoix(event.target.value); //tu clic, tu vois que ca a déjà été sorted, //par défaut y'a rien (pas d'ordre), tu cliques, ca fait par ordre croissant
    } else {
      setChoix(`-` + event.target.value); //decroissant
    }
  };

  console.log(token);

  const onChange = (event) => {
    // console.log(event.target.value); //event target value = ce sur quoi t'as cliqué xbox à transformer en 5, executer fonction plateforme avec 5

    //DEUXIEME PARTIE
    //tu set le state idgame à elemplatformgame.id
    {
      platform &&
        platform.results.map((elemplatformgame, index) => {
          //tu te places sur le premier
          //   console.log(elemplatformgame.name);
          if (elemplatformgame.name === event.target.value) {
            setIdgame(elemplatformgame.id);

            console.log(elemplatformgame.id);
          }
        });
    }
  };

  //a chaque foid que ca change tu execute cette fonction, a, a b -> tu execute fonction, tu
  const onChangegenre = (event) => {
    console.log(event.target.value); //event target value = ce sur quoi t'as cliqué xbox à transformer en 5, executer fonction plateforme avec 5
    setGametype(event.target.value);
  };

  const handleFavori = async (photogame, nom, tok) => {
    console.log(photogame);
    console.log(nom);
    console.log(tok);
    //au clic enregistrer photo et nom dans base de donnée mango
    const response = await axios.post("http://localhost:3000/favori", {
      nomphoto: photogame, //tu vas mettre dans champ email
      nomgame: nom, //tu vas mettre dans champ hash
      valeurtoken: tok,
    });
    console.log(response.data);
  };

  return isLoading ? (
    <span>en cours de chargement </span>
  ) : (
    <>
      <button onClick={handlePagenext}>suivant</button>

      <button onClick={handlePageprevious}>precedent</button>

      <select onClick={handleSelect} onChange={onChange}>
        <option>- Please select a platform -</option>
        {platform &&
          platform.results.map((platformeelem, index) => {
            return <option key={index}>{platformeelem.name}</option>;
          })}
      </select>

      {/* genres jeu */}
      <select onClick={handleGenre} onChange={onChangegenre}>
        <option>- Please select a genre -</option>
        {genre && //on map sur le tableau genre
          genre.results.map((elemgenre, index) => {
            return <option key={index}>{elemgenre.slug}</option>;
          })}
      </select>

      <input onChange={handleChange} />
      {/* on regarde ce qui se passe a l'interieur */}
      {/* //barre de recherche */}
      {/* au change, executer fonction handlechange */}
      {/* a l'action, le state change */}

      {/* //au change tu execute cette fonction qui recupere event target value */}
      <select onChange={handleOrdering}>
        <option>- Please select ordering</option>
        <option>released</option>
        <option>rating</option>
        <option>name</option>
      </select>

      <div className="global">
        {data.results.map((elem, index) => {
          return (
            //elem (i) on va lui assigner chaque valeurs du tableau, elem on va lui assigner chaque tableau results de la map
            <div className="game">
              {/* //création de la page */}
              <Link to={`/games/${elem.id}`}>
                {/* c'est une page */}
                <img className="pics" src={elem.background_image} />
              </Link>
              <div>
                <span>{elem.name}</span>
              </div>
              <button
                onClick={() =>
                  handleFavori(elem.background_image, elem.name, token)
                }
              >
                FAVORI
              </button>
              {/* au clic envoyer envoyer id photo nom en base de donné mangodb via un objet */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Games;
