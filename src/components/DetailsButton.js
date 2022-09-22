const DetailsButton = ({ index, handleClick }) => {
  return <button onClick={(index) => handleClick(index)}>Details</button>;
};

export default DetailsButton;
