const express = require("express");
const newsRouter = express.Router();
const axios = require("axios");
const bcrypt = require("bcrypt");

const fs = require("fs");

const multer = require("multer");


const users = [];

newsRouter.get("", async (req, res) => {
  try {
    const newsAPI = await axios.get(`http://localhost:3001/api/`);
    res.render("news", { articles: newsAPI.data });
  } catch (err) {
    if (err.response) {
      res.render("news", { articles: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      res.render("news", { articles: null });
      console.log(err.request);
    } else {
      res.render("news", { articles: null });
      console.error("Error", err.message);
    }
  }
});

newsRouter.get("/:id", async (req, res) => {
  let articleID = req.params.id;

  try {
    const newsAPI = await axios.get(`http://localhost:3001/api/${articleID}`);
    res.render("newsSingle", { article: newsAPI.data });
  } catch (err) {
    if (err.response) {
      res.render("newsSingle", { article: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      res.render("newsSingle", { article: null });
      console.log(err.request);
    } else {
      res.render("newsSingle", { article: null });
      console.error("Error", err.message);
    }
  }
});

newsRouter.post("", async (req, res) => {
  let search = req.body.search;

  try {
    const newsAPI = await axios.get(`http://localhost:3001/api/${search}`);
    res.render("newsSearch", { articles: newsAPI.data });
  } catch (err) {
    if (err.response) {
      res.render("newsSearch", { articles: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      res.render("newsSearch", { articles: null });
      console.log(err.request);
    } else {
      res.render("newsSearch", { articles: null });
      console.error("Error", err.message);
    }
  }
});

// AUTH PAGE

newsRouter.get("/auth/:method?", function (req, res, next) {
  if (req.params.method == "login" || req.params.method == "signin") {
    res.render("auth", { method: "login" });
  } else if (req.params.method == "signup" || req.params.method == "register") {
    res.render("auth", { method: "signup" });
  } else if (req.params.method == "createpost") {
    res.render("auth", { method: "createpost" });
  }
});

newsRouter.post("/auth/:method?", async function (req, res, next) {
  if (req.params.method == "login" || req.params.method == "signin") {
  } else if (req.params.method == "signup" || req.params.method == "register") {
    try {
      res.redirect("/login");
    } catch {
      res.redirect("/signup");
    }
    console.dir(users);
  } else if (req.params.method == "createpost"){
    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
        var dir = "./images";

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        callback(null, dir);
      },

      filename: function (req, file, callback) {
        callback(null, file.originalname);
      },
    });
    var upload = multer({ storage: storage }).array("files", 1);
  }
});

module.exports = newsRouter;
