const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let results = await db.getAllPosts();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     let results = await db.getPost(req.params.id);
//     res.json(results);
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// });

router.get("/votes/", async (req, res, next) => {
  try {
    console.dir(req.query.post_id);
    let results = await db.showVotesPost(req.query.post_id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/signup/submit", async (req, res, next) => {
  try {
    let results = await db.signUpUser(req.body);
    return res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/upvote/", async (req, res, next) => {
  try {
    console.log(req.query.post_id);
    await db.incrementVotePost(1, req.query.post_id);
    return res.json("INCREMENTED");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/downvote/", async (req, res, next) => {
  try {
    let results = await db.decrementVotePost("1", req.query.post_id);
    return res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let results = await db.getPost(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
