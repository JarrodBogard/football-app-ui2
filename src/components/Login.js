import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { users, logUser, setLogId, checkPlayers, refetchPlayers } =
    useContext(AppContext);
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

    if (loggedUser) {
      logUser();
      setLogId(id);
      checkPlayers(id);
      refetchPlayers(id);
      navigate("/home");
    }
  };

  return (
    <main className="loginpage-main-container">
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
  );
};

export default Login;
