import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const FantasyStats = (props) => {
  const { fantasyPlayerStats } = useContext(AppContext);

  return (
    <ul className="player-stats-list">
      {fantasyPlayerStats.map((player) => (
        <>
          {player.PlayerID === props.player.PlayerID ? (
            <li className="homepage-list-items">
              <p>
                <span>Fantasy Pts:</span>{" "}
                <span className="list-span">{player.FantasyPoints}</span>
              </p>
              <p>
                <span>Status:</span>
                <span className="list-span">
                  {player.InjuryStatus === null ? "Healthy" : "Injured"}
                </span>
              </p>
              <p>
                <span>Next Game:</span>{" "}
                <span className="list-span">{player.Opponent}</span>
              </p>
            </li>
          ) : null}
          {/* {player.PlayerID === props.player.PlayerID ? (
              <>
              <p>Fantasy Pts: {player.FantasyPoints}</p>
              <p>Status: {player.InjuryStatus}</p>
              <p>Next Game: {player.HomeOrAway}</p>
              </>
            ) : null} */}
          {/* <p>
            {player.PlayerID === props.player.PlayerID
                ? `Fantasy Pts: ${player.FantasyPoints}`
                : null}
                </p>
                <p>
                {player.PlayerID === props.player.PlayerID
                    ? `Status: ${
                        player.InjuryStatus === null ? "Healthy" : "Injured"
                    }`
                    : null}
                    </p>
                    <p>
                    {player.PlayerID === props.player.PlayerID
                        ? `Next Game: ${player.Opponent} (${player.HomeOrAway})`
                        : null}
                    </p> */}
          {/* </li> */}
        </>
      ))}
    </ul>
  );
};

export default FantasyStats;
