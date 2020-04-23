const reducer = (state = {}, action) => {
  console.log("redu", action);
  switch (action.type) {
    case "ROUTE_FETCH_REQUESTED":
      console.log("in reducer!!!");
      return state;
    default:
      return state;
  }
};
export default reducer;
