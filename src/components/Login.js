import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { users, logUser, setLogId, checkPlayers } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "test@mail.com",
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
        state.username === user.username && state.password === user.password
    );
<<<<<<< HEAD
    const { id } = loggedUser;
=======
>>>>>>> 62941b3cc70cc51a289f8dc0be4274fb07c34585

    if (loggedUser) {
      const { id } = loggedUser;
      console.log(id);
      logUser();
      setLogId(id);
      checkPlayers(id);
      navigate("/home");
    }

    if (!loggedUser) {
      console.log("fired not logged");
      fetch(`https://football-app-beta.vercel.app/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      }).then(() => {
        logUser();
        navigate("/home");
        const foundUser = users.find(
          (user) =>
            state.username === user.username && state.password === user.password
        );
        const { id } = foundUser;
        setLogId(id);
        checkPlayers(id);
      });
    }

    // if (!loggedUser) {
    //   console.log("fired not logged");
    //   fetch(`https://football-app-beta.vercel.app/users`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(state),
    //   }).then(() => {
    //     logUser();
    //     navigate("/home");
    //     const foundUser = users.find((user) => user.id === users.length);
    //     const { id } = foundUser;
    //     setLogId(id);
    //     checkPlayers(id);
    //   });
    // }
  };

  return (
    <main className="loginpage-main-container">
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">
          <input
            className="login-input"
            onChange={(e) => handleChange(e)}
            type="text"
            name="username"
            value={state.username}
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
            name="password"
            value={state.password}
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
