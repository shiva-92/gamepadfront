import { Link, useNavigate } from "react-router-dom";

import logogamepad from "../src/gamepadlogo.png";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  const handleCollection = () => {
    if (token) {
      navigate("/collection");
    } else {
      navigate("/signup");
    }
  };

  const handleDeconnection = () => {
    setUser(null);
    navigate("/");
  };

  const handleimage = () => {
    navigate("/");
  };
  return (
    <>
      <div className="header">
        <img src={logogamepad} onClick={handleimage} />
        <div class="partright">
          <button
            onClick={handleCollection} //au clic on décide d'executer cette fonction
          >
            MYCOLLECTION
          </button>

          {token ? (
            <>
              <span>CONNECTE</span>
              <button onClick={handleDeconnection}>SE DECONNECTER</button>
            </>
          ) : (
            <>
              <Link to="/signup">SIGNUP</Link>
              <Link to="/login">LOGIN</Link>
            </>
          )}
        </div>

        {/* //execute interieur de la fonction avec argument vide il refuse*/}
      </div>
    </>
  );
};

export default Header;
