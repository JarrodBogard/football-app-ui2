import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [fantasyData, setFantasyData] = useState([]);
  const [playerData, setPlayerData] = useState(
    JSON.parse(localStorage.getItem("playerData")) || []
  );
  const [isToggled, setIsToggled] = useState(false);
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
    matchedPlayers(filteredPlayers);
  };

  const matchedPlayers = (players = loggedPlayers) => {
    let firstName = "";
    let lastName = "";
    let firstLastName = [];

    for (const player of players) {
      firstName = player.first_name;
      lastName = player.last_name;
      firstLastName.push(`${firstName} ${lastName}`);
    }

    const filteredFantasyData = fantasyData.filter((data) => {
      let playerName = `${data.FirstName} ${data.LastName}`;
      if (firstLastName.includes(playerName)) return data;
      else return null;
    });
    setPlayerData(filteredFantasyData);
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
    localStorage.setItem("playerData", JSON.stringify(playerData));
    console.log(
      loggedPlayers,
      isLogged,
      logId,
      playerData,
      "set in local storage"
    );
  }, [loggedPlayers, isLogged, logId, playerData]);

  const retrieveDetails = (id) => {
    console.log(id);
    const player = playerData.find((player) => player.PlayerID === id);
    console.log(player);
    setPlayerDetails(player);
    console.log(playerDetails, "playerDetails");
  };

  const removePlayer = (playerId, userId) => {
    fetch(`https://football-app-beta.vercel.app/players/${playerId}`, {
      method: "DELETE",
    }).then(() => refetchPlayers(userId));
  };

  const refetchPlayers = (userId) => {
    // setTimeout(() => {
    fetch(`https://football-app-beta.vercel.app/players/${userId}/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "refetch loggedPlayers");
        setLoggedPlayers(data);
        matchedPlayers(data);
      });
    // }, 250);

    // matchedPlayers(loggedPlayers);
    // updates fantasy data saved to playerData after adding a player to the database
    // setTimeout(() => {
    // }, 1000);
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

    const fetchFantasyData = () => {
      fetch(
        `https://api.sportsdata.io/api/nfl/fantasy/json/Players?key=61fd0979be90419cbd6dc53c4e6f2df3`
      )
        .then((response) => {
          if (!response.ok)
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          return response.json();
        })
        .then((data) => setFantasyData(data))
        .catch((err) => console.log(err.message));
    };
    fetchUserData();
    fetchPlayerData();
    fetchFantasyData();
  }, []);

  useEffect(() => {
    console.log(playerData);
    // console.log(users, players, fantasyData);
  }, [users, players, fantasyData, playerData]);

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
        isToggled,
        setIsToggled,
        matchedPlayers,
        playerData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
