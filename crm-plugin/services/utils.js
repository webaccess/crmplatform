const { isEmpty } = require("lodash");
var includes = require("lodash.includes");

result = {
  error: "false",
  errrorType: "",
  message: "",
};

function checkParams(values, requiredValues) {
  console.log("Type-------", typeof values);
  if ((values, requiredValues)) {
    //Checks if params are empty
    if (isEmpty(values)) {
      result = {
        error: "true",
        errrorType: "EmptyParams",
        message: "Parameters are empty",
      };
      return result;
    }
    requiredValues.map((r) => {
      //checks whether API params contain required params
      // if (!values.includes(r))
      if (!includes(values, r)) {
        result = {
          error: "true",
          errrorType: "RequiredParamsMissing",
          message: "Required Parameters are missing",
        };
        return;
      }
    });
    return result;
  }
}

module.exports = {
  checkParams,
};
