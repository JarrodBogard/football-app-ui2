import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [logId, setLogId] = useState(
    JSON.parse(localStorage.getItem("logId")) || 0
  );
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("isLogged")) || false
  );
  const [loggedPlayers, setLoggedPlayers] = useState(
    JSON.parse(localStorage.getItem("loggedPlayers")) || []
  );
  const [playerDetails, setPlayerDetails] = useState([]);

  const logUser = () => {
    setIsLogged(true);
  };

  const logOutUser = () => {
    setIsLogged(false);
    setLoggedPlayers([]);
  };

  const checkPlayers = (userId) => {
    const filteredPlayers = players.filter(
      (player) => player.user_id === userId
    );
    console.log(filteredPlayers, "filteredPlayers");
    setLoggedPlayers(filteredPlayers);
  };

  // useEffect(() => {
  //   const data = window.localStorage.getItem("loggedPlayers");
  //   console.log(data, "------- refresh ------");
  //   if (data !== null) setLoggedPlayers(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("loggedPlayers"));
  //   if (data) {
  //     console.log(data, "on refresh");
  //     setLoggedPlayers(data);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("loggedPlayers", JSON.stringify(loggedPlayers));
    localStorage.setItem("isLogged", JSON.stringify(isLogged));
    localStorage.setItem("logId", JSON.stringify(logId));
    console.log(loggedPlayers, isLogged, "set in local storage");
  }, [loggedPlayers, isLogged, logId]);

  const retrieveDetails = (id) => {
    const player = loggedPlayers.find((player) => player.id === id);
    console.log(player);
    setPlayerDetails(player);
    console.log(playerDetails, "playerDetails");
  };

  const refetchPlayers = (userId) => {
    setTimeout(() => {
      fetch(`https://football-app-beta.vercel.app/players/${userId}/users`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "refetch loggedPlayers");
          setLoggedPlayers(data);
        });
    }, 250);
  };

  const removePlayer = (playerId) => {
    fetch(`https://football-app-beta.vercel.app/players/${playerId}`, {
      method: "DELETE",
    });
  };

  useEffect(() => {
    const fetchUserData = () =>
      fetch(`https://football-app-beta.vercel.app/users`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => setUsers(data))
        .catch((err) => console.log(err.message));

    const fetchPlayerData = () =>
      fetch(`https://football-app-beta.vercel.app/players`)
        .then((response) => {
          if (!response.ok)
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          return response.json();
        })
        .then((data) => setPlayers(data))
        .catch((err) => console.log(err.message));
    fetchUserData();
    fetchPlayerData();
  }, []);

  useEffect(() => {
    console.log(isLogged);
  }, [isLogged]);

  return (
    <AppContext.Provider
      value={{
        users,
        players,
        isLogged,
        logUser,
        logId,
        setLogId,
        loggedPlayers,
        checkPlayers,
        refetchPlayers,
        logOutUser,
        setLoggedPlayers,
        removePlayer,
        retrieveDetails,
        playerDetails,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
