import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [fantasyData, setFantasyData] = useState([]);
  const [fantasyPlayerStats, setFantasyPlayerStats] = useState(
    JSON.parse(localStorage.getItem("fantasyPlayerStats")) || []
  );
  const [fantasyPlayerData, setFantasyPlayerData] = useState(
    JSON.parse(localStorage.getItem("fantasyPlayerData")) || []
  );
  const [playerStats, setPlayerStats] = useState([]);
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
    matchedPlayerData(filteredFantasyData);
  };

  const matchedPlayerData = (players) => {
    const playerIDs = [];
    for (const player of players) playerIDs.push(player.PlayerID);

    const filteredFantasyPlayerData = fantasyPlayerData.filter((player) =>
      playerIDs.includes(player.PlayerID)
    );
    setFantasyPlayerStats(filteredFantasyPlayerData);
  };

  useEffect(() => {
    localStorage.setItem("loggedPlayers", JSON.stringify(loggedPlayers));
    localStorage.setItem("isLogged", JSON.stringify(isLogged));
    localStorage.setItem("logId", JSON.stringify(logId));
    localStorage.setItem("playerData", JSON.stringify(playerData));
    localStorage.setItem(
      "fantasyPlayerStats",
      JSON.stringify(fantasyPlayerStats)
    );
    // console.log(
    //   loggedPlayers,
    //   isLogged,
    //   logId,
    //   playerData,
    //   fantasyPlayerStats,
    //   "set in local storage"
    // );
  }, [loggedPlayers, isLogged, logId, playerData, fantasyPlayerStats]);

  const retrieveDetails = (id) => {
    const player = playerData.find((player) => player.PlayerID === id);
    setPlayerDetails(player);
  };

  const removePlayer = (playerId, userId) => {
    fetch(`https://football-app-beta.vercel.app/players/${playerId}`, {
      method: "DELETE",
    }).then(() => refetchPlayers(userId));
  };

  const refetchPlayers = (userId) => {
    fetch(`https://football-app-beta.vercel.app/players/${userId}/users`)
      .then((res) => res.json())
      .then((data) => {
        setLoggedPlayers(data);
        matchedPlayers(data);
        // matchedPlayerData(data);
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

    const fetchFantasyStats = () => {
      fetch(
        `https://api.sportsdata.io/api/nfl/fantasy/json/PlayerSeasonStats/2021REG?key=61fd0979be90419cbd6dc53c4e6f2df3`
      )
        .then((response) => {
          if (!response.ok)
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          return response.json();
        })
        .then((data) => setPlayerStats(data))
        .catch((err) => console.log(err.message));
    };

    const fetchFantasyPlayerData = () =>
      fetch(
        `https://api.sportsdata.io/api/nfl/fantasy/json/PlayerGameProjectionStatsByWeek/2021REG/4?key=61fd0979be90419cbd6dc53c4e6f2df3`
      )
        .then((response) => {
          if (!response.ok)
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          return response.json();
        })
        .then((data) => setFantasyPlayerData(data))
        .catch((err) => console.log(err.message));

    fetchUserData();
    fetchPlayerData();
    fetchFantasyData();
    fetchFantasyStats();
    fetchFantasyPlayerData();
  }, []);

  useEffect(() => {
    // console.log(fantasyPlayerData, "fantasyPlayerData");
    // console.log(fantasyPlayerStats, "fantasyPlayerStats");
    // console.log(playerStats);
    // console.log(playerData);
    // console.log(users, players, fantasyData);
  }, [
    users,
    players,
    fantasyData,
    playerData,
    playerStats,
    fantasyPlayerData,
    fantasyPlayerStats,
  ]);

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
        fantasyPlayerData,
        fantasyPlayerStats,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
