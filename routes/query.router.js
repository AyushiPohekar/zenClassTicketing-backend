const express = require("express");
const router = express.Router();
const { insertquery } = require("../models/querymodel");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, function (req, res) {
  res.send("Hello World");
});

router.post("/", authenticate, async function (req, res) {
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

module.exports = router;
