import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

import AddPlayerForm from "./AddPlayerForm";
import FantasyStats from "./FantasyStats";
import DetailsPage from "./DetailsPage";

const Home = () => {
  const {
    loggedPlayers,
    removePlayer,
    retrieveDetails,
    playerDetails,
    isToggled,
    setIsToggled,
    playerData,
    fantasyPlayerStats,
  } = useContext(AppContext);
  const handleDelete = (player) => {
    const foundPlayer = loggedPlayers.find(
      (el) =>
        el.first_name === player.FirstName && el.last_name === player.LastName
    );
    const { id, user_id } = foundPlayer;
    removePlayer(id, user_id);
    // refetchPlayers(user_id);
  };

  const handleDetails = ({ PlayerID }) => {
    const blurredDiv = document.querySelector(".blurred-background-div");
    setIsToggled(!isToggled);
    retrieveDetails(PlayerID);
    blurredDiv.classList.add("blur");
  };

  const handleBlur = () => {
    const blurredDiv = document.querySelector(".blurred-background-div");
    blurredDiv.classList.remove("blur");
    setIsToggled(false);
  };

  return (
    <main className="homepage-main-container">
      {isToggled && <DetailsPage player={playerDetails} />}
      {/* {isToggled ? <DetailsPage player={playerDetails} /> : null} */}
      <div className="blurred-background-div" onClick={handleBlur}></div>
      <div className="bg-image"></div>
      <AddPlayerForm isToggled={isToggled} />
      <ul className="player-cards-list">
        {playerData.map((player, index) => (
          <li className="player-card-items" key={index}>
            <button
              className="player-delete-button"
              onClick={() => handleDelete(player)}
            >
              X
            </button>
            <p>
              {player.FirstName[0]}. {player.LastName}
            </p>
            <img src={player.PhotoUrl} alt="football player holding football" />
            <h4 style={{ margin: 0 }}>Stats</h4>
            {/* <ul className="player-stats-list"> */}
            <FantasyStats player={player} />
            {/* <li>Fanatsy Pts:</li>
              <li>Targets:</li>
              <li>Predictions:</li>
            </ul> */}
            <button onClick={() => handleDetails(player)}>Details</button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
