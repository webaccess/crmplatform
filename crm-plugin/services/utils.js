const { isEmpty } = require("lodash");
result = {
  error: "false",
  errrorType: "",
  message: "",
};

function checkParams(values, requiredValues) {
  console.log("Values Aur required values dono ",values, requiredValues)
  const keys = Object.keys(values);
   console.log("isEmpty??",values,isEmpty(values));
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
      console.log("Keys",keys)
      //checks whether API params contain required params
      if (!keys.includes(r)) {
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
