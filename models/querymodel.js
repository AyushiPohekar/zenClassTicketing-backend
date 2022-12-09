const authenticate = require("../middleware/authenticate");
const { QuerySchema } = require("./querySchema");
const { UserSchema } = require("./userSchema");




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
      QuerySchema.find({ clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
// const getAdminDashboardQueries = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       QuerySchema.find({ status2: "UNASSIGNED", status1: "OPEN" })
//         .then((data) => resolve(data))
//         .catch((error) => reject(error));
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

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

const getQueryForMentor = ({ _id, clientId }) => {
  //console.log(_id);
  //console.log(clientId);
  return new Promise((resolve, reject) => {
    try {
      QuerySchema.findOneAndUpdate(
        { _id, clientId },

        {
          status2: "ASSIGNED",
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

//get user for particular  query

const getMentorQuery = () => {
  return new Promise((resolve, reject) => {
    try {
      QuerySchema.find({ status2: "UNASSIGNED", status1: "OPEN" })
        .populate("rasiedBy")
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


const updateStatusCloseFormentor=({ _id, clientId }) => {
  console.log("outsidePromise",_id)
  return new Promise((resolve, reject) => {
    try {
      console.log("insidePromise",_id)
      QuerySchema.findByIdAndUpdate(
        
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

const getMentorQueryById = ({_id, clientId}) => {
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



module.exports = {
  insertquery,
  getqueries,
  getQueryById,
  updateStatusClose,
  deleteQuery,
  getMentorQuery,
   getQueryForMentor,
   getMentorQueryById,
   updateStatusCloseFormentor
};
