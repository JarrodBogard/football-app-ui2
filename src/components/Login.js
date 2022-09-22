import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const Login = () => {
  const { users, logUser, setLogId, checkPlayers } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    loginName: "",
    loginPass: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedUser = users.find(
      (user) =>
        state.loginName === user.username && state.loginPass === user.password
    );
    const { id } = loggedUser;
    console.log(id);

    if (loggedUser) {
      logUser();
      navigate("/home");
      setLogId(id);
      checkPlayers(id);
    }
  };

  return (
    <>
      <main className="loginpage-main-container">
        {/* <Navigation /> */}
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="username">
            <input
              className="login-input"
              onChange={(e) => handleChange(e)}
              type="text"
              name="loginName"
              value={state.loginName}
              placeholder="Username"
              autoComplete="off"
              required
            />
          </label>
          <label htmlFor="password">
            <input
              className="login-input"
              onChange={(e) => handleChange(e)}
              type="password"
              name="loginPass"
              value={state.loginPass}
              placeholder="Password"
              required
            />
          </label>
          <button className="login-button">Login</button>
        </form>
      </main>
    </>
  );
};

export default Login;
