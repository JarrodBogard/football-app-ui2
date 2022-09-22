const DetailsPage = ({ player }) => {
  console.log(player, "details page");
  return (
    <div className="details-page-div-container">
      {player.id} {player.first_name}
    </div>
  );
};

export default DetailsPage;
