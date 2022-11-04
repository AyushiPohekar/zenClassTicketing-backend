const express = require("express");
const router = express.Router();
const { insertquery,getqueries,getQueryById,updateStudentReply,updateStatusClose,deleteQuery } = require("../models/querymodel");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const {createNewQueryValidation,replyQueryMessageValidation} =require( '../middleware/formValidation.middleware');

//create new query
router.post("/",createNewQueryValidation, authenticate, async function (req, res) {
  const { subject, category, subCategory, description, sender, message } =
    req.body;
  console.log(req.userId);

  const userId = req.userId;
  if (!subject || !category || !description) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const queryObj = {
      clientId: userId,
      subject,
      category,
      subCategory,
      description,
      conversations: [
        {
          sender,
          message,
        },
      ],
      rasiedBy: userId,
    };

    const result = await insertquery(queryObj);

    if (result._id) {
      return res.json({
        status: "success",
        message: "New query has been created!",
      });
    }

    res.json({
      status: "error",
      message: "Unable to create the ticket , please try again later",
    });
    console.log(res.json);
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});


// Get all queries for a specific student
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getqueries(userId);

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});


// Get all tickets for a specific user
router.get("/:_id", authenticate, async (req, res) => {
  try {
    const { _id } = req.params;

    const clientId = req.userId;
    const result = await getQueryById(_id, clientId);

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});


// update reply message form student
router.put(
  "/:_id",
  replyQueryMessageValidation,

 authenticate,
  async (req, res) => {
    try {
      const { message, sender } = req.body;
      const { _id } = req.params;
      const clientId = req.userId;

      const result = await updateStudentReply({ _id, message, sender });

      if (result._id) {
        return res.json({
          status: "success",
          message: "your message updated",
        });
      }
      res.json({
        status: "error",
        message: "Unable to update your message please try again later",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
);

// update ticket status to close
router.patch("/close-query/:_id", authenticate, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;

    const result = await updateStatusClose({ _id, clientId });

    if (result._id) {
      return res.json({
        status: "success",
        message: "The query has been closed",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update the ticket",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Delete a ticket
router.delete("/:_id", authenticate, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;

    const result = await deleteQuery({ _id, clientId });

    return res.json({
      status: "success",
      message: "The query has been deleted",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});



module.exports = router;
