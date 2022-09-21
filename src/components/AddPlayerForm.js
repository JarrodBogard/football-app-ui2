import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const AddPlayerForm = () => {
  const { logId, refetchPlayers } = useContext(AppContext);

  const [state, setState] = useState({
    user_id: logId,
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    fetch(`https://football-app-beta.vercel.app/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });

    refetchPlayers(state.user_id);
    setState({
      ...state,
      first_name: "",
      last_name: "",
    });
  };

  useEffect(() => {
    // console.log(state);
  }, [state]);

  return (
    <form
      className="addplayer-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label htmlFor="first_name">
        Search Players:{" "}
        <input
          type="text"
          name="first_name"
          value={state.first_name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="last_name">
        <input
          type="text"
          name="last_name"
          value={state.last_name}
          onChange={handleChange}
          required
        />
      </label>
      <button>Add Player</button>
    </form>
  );
};

export default AddPlayerForm;
