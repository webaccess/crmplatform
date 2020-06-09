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

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = {
  checkParams,
  asyncForEach,
};
