const { isEmpty } = require("lodash");
result = {
  error: false,
  errrorType: "",
  message: "",
};

function checkParams(values, requiredValues) {
  //Checks if params are empty
  if (isEmpty(values)) {
    result = {
      error: true,
      errrorType: "EmptyParams",
      message: "Parameters are empty",
    };
    return result;
  }
  if ((values, requiredValues)) {
    requiredValues.map((r) => {
      console.log("Keys",keys)
      //checks whether API params contain required params
      if (!Object.keys(values).includes(r)) {
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
