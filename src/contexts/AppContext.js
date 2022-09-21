import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [logId, setLogId] = useState(0);
  // const [isLogged, setIsLogged] = useState(false);
  const [loggedPlayers, setLoggedPlayers] = useState(
    JSON.parse(localStorage.getItem("loggedPlayers")) || []
  );

  // const logUser = () => {
  //   setIsLogged(true);
  // };

  // const logOutUser = () => {
  //   setIsLogged(false);
  //   setLoggedPlayers([]);
  // };

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
    console.log(loggedPlayers, "set in local storage");
  }, [loggedPlayers]);

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

  return (
    <AppContext.Provider
      value={{
        users,
        players,
        // logUser,
        logId,
        setLogId,
        loggedPlayers,
        checkPlayers,
        refetchPlayers,
        // logOutUser,
        setLoggedPlayers,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
