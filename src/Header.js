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
        <button
          className="landingpage"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logogamepad} onClick={handleimage} />
        </button>
        <div class="partright">
          <button onClick={handleCollection}>MES FAVORIS</button>

          {token ? (
            <>
              <span>CONNECTE</span>
              <button onClick={handleDeconnection}>SE DECONNECTER</button>
            </>
          ) : (
            <>
              <Link to="/signup">SIGN UP</Link>
              <Link to="/login">LOGIN</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
