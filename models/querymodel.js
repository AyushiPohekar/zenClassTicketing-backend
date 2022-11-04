const authenticate = require("../middleware/authenticate");
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


const getQueryById = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
     QuerySchema.find({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};


const updateStudentReply = ({ _id, message, sender }) => {
  return new Promise((resolve, reject) => {
    try {
      QuerySchema.findOneAndUpdate(
        { _id },
        {
          status1: "OPEN",
          $push: {
            conversations: { message, sender },
          },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};


const updateStatusClose = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
   QuerySchema.findOneAndUpdate(
        { _id, clientId },
        {
          status1: "CLOSE",
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteQuery = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
      QuerySchema.findOneAndDelete({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
    insertquery,getqueries,getQueryById,updateStudentReply,updateStatusClose,deleteQuery
  
  };