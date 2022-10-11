import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const FantasyStats = (props) => {
  const { fantasyPlayerStats } = useContext(AppContext);

  return (
    <>
      {fantasyPlayerStats.map((player, index) => (
        <ul key={index} className="player-stats-list">
          {player.PlayerID === props.player.PlayerID ? (
            <li className="homepage-list-items">
              <p>
                <span>Fantasy Pts:</span>{" "}
                <span className="list-span">{player.FantasyPoints}</span>
              </p>
              <p>
                <span>Status:</span>
                <span
                  className="list-status"
                  style={
                    player.InjuryStatus === null
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {player.InjuryStatus === null ? "Healthy" : "Injured"}
                </span>
              </p>
              <p>
                <span>Next Game:</span>{" "}
                <span className="list-span">{player.Opponent}</span>
              </p>
            </li>
          ) : null}
        </ul>
      ))}
    </>
  );
};

export default FantasyStats;
