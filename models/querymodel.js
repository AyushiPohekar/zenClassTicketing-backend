const {QuerySchema } = require("./querySchema");

const insertquery = (queryObj) => {
  return new Promise((resolve, reject) => {
    try {
      QuerySchema(queryObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
const getqueries = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      QuerySchema
        .find({clientId})
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
    insertquery,getqueries
  
  };