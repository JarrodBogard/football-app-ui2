import { useContext } from "react";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import { AppContext } from "../contexts/AppContext";

const DetailsPage = ({ player }) => {
  const { fantasyPlayerStats } = useContext(AppContext);
  console.log(fantasyPlayerStats, "details page");

  const foundPlayer = fantasyPlayerStats.find(
    (fantasyPlayer) => fantasyPlayer.PlayerID === player.PlayerID
  );

  const fadeInAnimation = keyframes`${fadeIn}`;
  const FadeInDiv = styled.div`
    animation: 1s ${fadeInAnimation};
  `;

  return (
    <FadeInDiv className="details-page-div-container">
      <img
        src={player.PhotoUrl}
        alt={`${player.FirstName} ${player.LastName}`}
      />
      <p>
        {player.FirstName} {player.LastName} (
        {player.InjuryStatus === null ? "Healthy" : "Injured"})
      </p>
      <ul style={{ listStyle: "none" }}>
        <li>Team: {player.Team}</li>
        <li>Position: {player.Position}</li>
        <h2 style={{ margin: "2.5px 0" }}>
          Season Stats (Week: {foundPlayer.Week})
        </h2>
        {player.Position === "QB" && (
          <>
            <h4 style={{ margin: "2.5px 0", color: "rgb(14, 73, 250)" }}>
              (Passing Stats)
            </h4>
            <li>Pass Attempts: {foundPlayer.PassingAttempts}</li>
            <li>Pass Completions: {foundPlayer.PassingCompletions}</li>
            <li>Passing Yards: {foundPlayer.PassingYards}</li>
            <li>Pass Percentage: {foundPlayer.PassingCompletionPercentage}%</li>
            <li>
              Passing Yards Per Attempt: {foundPlayer.PassingYardsPerAttempt}%
            </li>
            <li>Pass Percentage: {foundPlayer.PassingYardsPerCompletion}%</li>
            <li>Passing TDs Per Game: {foundPlayer.PassingTouchdowns}</li>
            <h4 style={{ margin: "2.5px 0", color: "rgb(14, 73, 250)" }}>
              (Fumbles, Interceptions, Sacks)
            </h4>
            <li>Fumbles Per Game: {foundPlayer.Fumbles}</li>
            <li>Interceptions Per Game: {foundPlayer.Interceptions}</li>
            <li>Sacks Per Game: {foundPlayer.Sacks}</li>
          </>
        )}
        {player.Position === "WR" && (
          <>
            <h4 style={{ margin: "2.5px 0", color: "rgb(14, 73, 250)" }}>
              (Receiving Stats)
            </h4>
            <li>Targets: {foundPlayer.ReceivingTargets}</li>
            <li>Catches: {foundPlayer.Receptions}</li>
            <li>Rec Yards: {foundPlayer.ReceivingYards}</li>
            <li>Yards Per Rec: {foundPlayer.ReceivingYardsPerReception}</li>
            <li>Rec TDs: {foundPlayer.ReceivingTouchdowns}</li>
            <h4 style={{ margin: "2.5px 0", color: "rgb(14, 73, 250)" }}>
              (Fumbles, Misc.)
            </h4>
            <li>Rushing Attempts: {foundPlayer.RushingAttempts}</li>
            <li>Rushing Yards: {foundPlayer.RushingYards}</li>
            <li>Rushing TDs: {foundPlayer.RushingTouchdowns}</li>
            <li>Fumbles Per Game: {foundPlayer.Fumbles}</li>
          </>
        )}
        {player.Position === "TE" && (
          <>
            <h4 style={{ margin: "2.5px 0", color: "rgb(14, 73, 250)" }}>
              (Receiving Stats)
            </h4>
            <li>Targets: {foundPlayer.ReceivingTargets}</li>
            <li>Catches: {foundPlayer.Receptions}</li>
            <li>Rec Yards: {foundPlayer.ReceivingYards}</li>
            <li>Yards Per Rec: {foundPlayer.ReceivingYardsPerReception}</li>
            <li>Rec TDs: {foundPlayer.ReceivingTouchdowns}</li>
            <h4 style={{ margin: "2.5px 0", color: "rgb(14, 73, 250)" }}>
              (Fumbles, Misc.)
            </h4>
            <li>Rushing Attempts: {foundPlayer.RushingAttempts}</li>
            <li>Rushing Yards: {foundPlayer.RushingYards}</li>
            <li>Rushing TDs: {foundPlayer.RushingTouchdowns}</li>
            <li>Fumbles Per Game: {foundPlayer.Fumbles}</li>
          </>
        )}
        {player.Position === "RB" && (
          <>
            <h4 style={{ margin: "2.5px 0", color: "rgb(14, 73, 250)" }}>
              (Rushing Stats)
            </h4>
            <li>Rushing Attempts: {foundPlayer.RushingAttempts}</li>
            <li>Rushing Yards: {foundPlayer.RushingYards}</li>
            <li>Rushing Yards: {foundPlayer.RushingYards}</li>
            <li>Yards Per Attempt: {foundPlayer.RushingYardsPerAttempt}</li>
            <li>Rushing TDs: {foundPlayer.RushingTouchdowns}</li>
            <h4 style={{ margin: "2.5px 0", color: "rgb(14, 73, 250)" }}>
              (Receiving Stats and Fumbles)
            </h4>
            <li>Targets: {foundPlayer.ReceivingTargets}</li>
            <li>Catches: {foundPlayer.Receptions}</li>
            <li>Rec Yards: {foundPlayer.ReceivingYards}</li>
            <li>Rec TDs: {foundPlayer.ReceivingTouchdowns}</li>
            <li>Fumbles Per Game: {foundPlayer.Fumbles}</li>
          </>
        )}
        {player.Position === "K" && (
          <>
            <h4 style={{ margin: "2.5px 0", color: "rgb(14, 73, 250)" }}>
              (Kicking Stats)
            </h4>
            <li>FGs Attempted: {foundPlayer.FieldGoalsAttempted}</li>
            <li>FGs Made: {foundPlayer.FieldGoalsMade}</li>
            <li>FGs 20-29yds: {foundPlayer.FieldGoalsMade20to29}</li>
            <li>FGs 30-39yds: {foundPlayer.FieldGoalsMade30to39}</li>
            <li>FGs 40-49yds: {foundPlayer.FieldGoalsMade40to49}</li>
            <li>FGs 50+yds: {foundPlayer.FieldGoalsMade50Plus}</li>
            <h4 style={{ margin: "2.5px 0", color: "rgb(14, 73, 250)" }}>
              (Fumbles, Misc.)
            </h4>
            <li>Fumbles Per Game: {foundPlayer.Fumbles}</li>
          </>
        )}
      </ul>
    </FadeInDiv>
  );
};

export default DetailsPage;
