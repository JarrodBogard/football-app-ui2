const DetailsPage = ({ player }) => {
  console.log(player, "details page");
  return (
    <div className="details-page-div-container">
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
    </div>
  );
};

export default DetailsPage;
