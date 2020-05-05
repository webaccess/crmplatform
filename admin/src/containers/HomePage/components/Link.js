import React from "react";
import { connect } from "react-redux";
import { handleRoute } from "../action";
import { store } from "../../../utils/store";

let Link = ({ dispatch }) => {
  console.log("handleRoute", handleRoute);
  return (
    <a href="javascript:void(0);" onClick={() => store.dispatch(handleRoute())}>
      Update routes
    </a>
  );
};
const mapDispatchToProps = {
  handleRoute: handleRoute,
};
// Link = connect(null, mapDispatchToProps)(Link);

export default connect()(Link);
// export default Link;
