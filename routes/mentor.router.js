const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const {
    updateStatusCloseFormentor,
    getMentorQuery,
    getMentorQueryById,

  getQueryForMentor
} = require("../models/querymodel");
const bcrypt = require("bcryptjs");

//get queries which is open and unassigned.
// router.get("/", async function (req, res) {
//   try {
//     const result = await getAdminDashboardQueries();

//     return res.json(result);
//   } catch (error) {
//     res.json({ status: "error", message: error.message });
//   }
// });

//get user for particular  query
router.get("/", async function (req, res) {
    try {

        const result = await getMentorQuery();
         
        return res.json(result);
      } catch (error) {
        res.json({ status: "error", message: error.message });
      }
    });



    router.get("/:_id", authenticate, async (req, res) => {
        try {
          const { _id } = req.params;
        
          console.log( _id)
      
          const clientId = req.userId;
          console.log(clientId)
          const result = await getMentorQueryById({_id, clientId});
      
          return res.json(result);
        } catch (error) {
          res.json({ status: "error", message: error.message });
        }
      });

//update ticket for mentor and close

router.patch("/close-query/:_id", authenticate, async (req, res) => {
    try {
      const { _id } = req.params;
      console.log(_id)
      const clientId = req.userId;
       console.log(clientId )
      const result = await updateStatusCloseFormentor({ _id, clientId });
  
      if (result._id) {
        return res.json(result);
      }
      res.json({
        status: "error",
        message: "Unable to update the ticket",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });






//get particular query for mentor
router.patch("/myqueries/:_id", authenticate, async (req, res) => {
    try {
      const { _id } = req.params;
    
      const clientId = req.userId;
   
    const result = await getQueryForMentor({ _id, clientId });
    //   const result = await getQueryForMentor({ '63679182e6bb57f800336942', '6361118d7153d286dab725a9' });
      console.log(result)
      if (result._id) {
        return res.json(result);
      }
      res.json({
        status: "error",
        message: "Unable to update the ticket",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });

module.exports = router;
