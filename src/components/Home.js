import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import AddPlayerForm from "./AddPlayerForm";

const Home = () => {
  const { loggedPlayers } = useContext(AppContext);
  const image =
    "https://cdn.pixabay.com/photo/2016/11/22/23/30/american-football-1851168__340.jpg";
  return (
    <main className="homepage-main-container">
      <Link className="logout-link" to="/">
        Go to Login Page
      </Link>
      {/* <Link to="/" onClick={logOutUser}> */}
      <AddPlayerForm loggedPlayers={loggedPlayers} />
      <ul className="player-cards-list">
        {loggedPlayers.map((player, index) => (
          <li className="player-card-items" key={index}>
            {player.first_name} {player.last_name}
            <img
              width="150px"
              height="150px"
              src={image}
              alt="football player holding football"
            />
            <h4 style={{ margin: 0 }}>Stats</h4>
            <ul className="player-stats-list">
              <li>Fanatsy Pts:</li>
              <li>Targets:</li>
              <li>Predictions:</li>
            </ul>
            <button>Details</button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
