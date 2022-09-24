import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
const Navigation = () => {
  const { isLogged, logOutUser } = useContext(AppContext);
  console.log(isLogged);
  return isLogged ? (
    <div className="navigation-div-container">
      <h1>My Football App</h1>
      <Link className="link-homepage" to="/" onClick={logOutUser}>
        LOGOUT
      </Link>
    </div>
  ) : (
    <div className="navigation-div-container">
      <h1>My Football App</h1>
    </div>
  );
};

export default Navigation;
