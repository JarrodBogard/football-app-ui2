import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import Navigation from "./Navigation";
import AddPlayerForm from "./AddPlayerForm";
import DetailsPage from "./DetailsPage";

const Home = () => {
  // const li = document.querySelector(".player-card-items")
  // const [isToggled, setIsToggled] = useState(false);
  const {
    loggedPlayers,
    removePlayer,
    refetchPlayers,
    retrieveDetails,
    playerDetails,
    isToggled,
    setIsToggled,
    playerData
  } = useContext(AppContext);
  const image =
    "https://cdn.pixabay.com/photo/2016/11/22/23/30/american-football-1851168__340.jpg";

  const handleDelete = ({ id, user_id }) => {
    console.log(id, user_id);
    removePlayer(id);
    refetchPlayers(user_id);
  };

  const handleDetails = ({ id }) => {
    const blurredDiv = document.querySelector(".blurred-background-div");
    setIsToggled(!isToggled);
    console.log(id);
    retrieveDetails(id);
    blurredDiv.classList.add("blur");
  };

  const handleBlur = () => {
    const blurredDiv = document.querySelector(".blurred-background-div");
    blurredDiv.classList.remove("blur");
    setIsToggled(false);
  };

  console.log(playerDetails, "home page details");
  return (
    <main className="homepage-main-container">
      {isToggled ? <DetailsPage player={playerDetails} /> : null}
      <div className="blurred-background-div" onClick={handleBlur}></div>
      <div
        className="bg-image"
        style={isToggled ? { filter: "blur(8px)" } : {}}
      ></div>
      {/* <Navigation /> */}
      <AddPlayerForm loggedPlayers={loggedPlayers} isToggled={isToggled} />
      <ul className="player-cards-list">
        {loggedPlayers.map((player, index) => (
          <li
            className="player-card-items"
            key={index}
            style={isToggled ? { filter: "blur(8px)" } : {}}
          >
            <button
              className="player-delete-button"
              onClick={() => handleDelete(player)}
            >
              X
            </button>
            <p>
              {player.first_name[0]}. {player.last_name}
            </p>
            <img
              width="175px"
              height="175px"
              src={image}
              alt="football player holding football"
            />
            <h4 style={{ margin: 0 }}>Stats</h4>
            <ul className="player-stats-list">
              <li>Fanatsy Pts:</li>
              <li>Targets:</li>
              <li>Predictions:</li>
            </ul>
            <button onClick={() => handleDetails(player)}>Details</button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
