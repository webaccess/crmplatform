const { isEmpty } = require("lodash");
// var includes = require("lodash.includes");

function checkParams(values, requiredValues) {
  let result = {
    error: false,
    errrorType: "",
    message: "No errors found",
  };
  const keys = Object.keys(values);
  //Checks if params are empty
  if (isEmpty(values)) {
    console.log("values", values);
    result = {
      error: true,
      errrorType: "EmptyParams",
      message: "Parameters are empty",
    };
    return result;
  }
  if ((values, requiredValues)) {
    requiredValues.map((r) => {
      //checks whether API params contain required params
      // if (!keys.includes(r)) {
      if (!Object.keys(values).includes(r)) {
        console.log("values, r", Object.keys(values), r);
        result = {
          error: true,
          errrorType: "RequiredParamsMissing",
          message: "Required Parameters are missing",
        };
        return result;
      }
    });
    return result;
  }
  return result;
}

module.exports = {
  checkParams,
};
