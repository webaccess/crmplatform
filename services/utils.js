const { isEmpty } = require("lodash");

function checkParams(values, requiredValues) {
  let result = {
    error: false,
    errrorType: "",
    message: "No errors found",
  };
  const keys = Object.keys(values);
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

//helper function
function getID(module, field, value) {
  console.log("module", module, "field", field, "value", value);
  const id = strapi.query(module, "crm-plugin").find({ field: value });
  console.log("id----", id);
}

module.exports = {
  checkParams,
  getID,
};
