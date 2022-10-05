export const appReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// useEffect(() => {
//   const data = window.localStorage.getItem("loggedPlayers");
//   console.log(data, "------- refresh ------");
//   if (data !== null) setLoggedPlayers(JSON.parse(data));
// }, []);

// useEffect(() => {
//   const data = JSON.parse(localStorage.getItem("loggedPlayers"));
//   if (data) {
//     console.log(data, "on refresh");
//     setLoggedPlayers(data);
//   }
// }, []);
