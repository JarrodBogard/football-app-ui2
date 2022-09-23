import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const AddPlayerForm = () => {
  const { logId, refetchPlayers, isToggled, matchedPlayers } =
    useContext(AppContext);

  const [state, setState] = useState({
    user_id: logId,
    first_name: "",
    last_name: "",
  });

  const [search, setSearch] = useState({
    first_last_name: "",
  });

  const handleChange = (e) => {
    setSearch({
      ...search,
      first_last_name: e.target.value,
    });

    setState({
      ...state,
      first_name: e.target.value.split(" ")[0],
      last_name: e.target.value.split(" ")[1],
    });
  };

  const handleSubmit = () => {
    fetch(`https://football-app-beta.vercel.app/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    }).then(() => refetchPlayers(state.user_id));

    setState({
      ...state,
      first_name: "",
      last_name: "",
    });

    setSearch({
      first_last_name: "",
    });
  };

  useEffect(() => {
    console.log(state);
    console.log(search);
  }, [state, search]);

  return (
    <form
      style={isToggled ? { filter: "blur(8px)" } : {}}
      className="addplayer-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className="search-players-label" htmlFor="first_last_name">
        <span>Search Players:</span>
        <input
          type="text"
          name="first_last_name"
          value={search.first_last_name}
          onChange={handleChange}
          required
        />
      </label>
      <button>Add Player</button>
    </form>
  );
};

export default AddPlayerForm;

/*<label htmlFor="first_name">
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
</label>*/
