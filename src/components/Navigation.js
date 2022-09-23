import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
const Navigation = () => {
  const { isLogged, logOutUser, isToggled } = useContext(AppContext);
  console.log(isLogged);
  return isLogged ? (
    <div
      style={isToggled ? { filter: "blur(8px)" } : {}}
      className="navigation-div-container"
    >
      <h1>My Football App</h1>
      <Link className="link-homepage" to="/" onClick={logOutUser}>
        LogOut
      </Link>
    </div>
  ) : (
    <div className="navigation-div-container">
      <h1>My Football App</h1>
    </div>
  );
};

export default Navigation;
