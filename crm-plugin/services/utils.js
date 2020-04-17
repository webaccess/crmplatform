const { isEmpty } = require("lodash");

const checkParams = (values, requiredValues) => {
  //Checks if params are empty
  if (isEmpty(values)) {
    return "Params are empty";
  }
  requiredValues.map((r) => {
    //checks whether API params contain required params
    if (!values.includes(r)) {
      return "Required Params are missing";
    }
  });
};

module.exports = {
  checkParams,
};
