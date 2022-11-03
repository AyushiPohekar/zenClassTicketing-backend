const express = require("express");
const queryrouter = express.Router();


queryrouter.get("/get", function (req, res) {
    res.send("Hi");
  });