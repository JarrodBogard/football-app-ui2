import { zoomInDown } from "react-animations";
import styled, { keyframes } from "styled-components";

const DetailsPage = ({ player }) => {
  const zoomInDownAnimation = keyframes`${zoomInDown}`;
  const ZoomInDownDiv = styled.div`
    animation: 1s ${zoomInDownAnimation};
  `;
  // console.log(player, "details page");
  return (
    <ZoomInDownDiv className="details-page-div-container">
      <img
        src={player.PhotoUrl}
        alt={`${player.FirstName} ${player.LastName}`}
      />
      <p>
        {player.FirstName} {player.LastName}
      </p>
      <ul style={{ listStyle: "none" }}>
        <li>Team: {player.Team}</li>
        <li>Position: {player.Position}</li>
      </ul>
    </ZoomInDownDiv>
  );
};

export default DetailsPage;
