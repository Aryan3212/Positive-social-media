const mysql = require("mysql");

const poolDb = mysql.createPool({
  connectionLimit: 10,
  password: "rootismypassword",
  user: "root",
  database: "positivitea",
  host: "127.0.0.1",
  port: "3306",
});

let postsDb = {};

postsDb.getAllPosts = () => {
  return new Promise((resolve, reject) => {
    poolDb.query(`SELECT * FROM posts`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

postsDb.createPost = (caption, picture_url, user_id) => {
  return new Promise((resolve, reject) => {
    poolDb.query(
      "INSERT INTO posts (post_id, user_id, caption, picture_url, vote, time_posted) VALUES (NULL, ?, ?,?,?,current_timestamp())",
      [user_id, caption, picture_url, 0],
      (err, results) => {
        if (err) {
          reject(err);
        }
        return resolve(results);
      }
    );
  });
};

postsDb.signUpUser = ({ name, username, user_id, password }) => {
  return new Promise((resolve, reject) => {
    poolDb.query(
      "INSERT INTO users (user_id, name, username) VALUES (?, ?, ?)",
      [user_id, name, username],
      (err, results) => {
        if (err) {
          reject(err);
        }
        return resolve("SIGN UP SUCCESSFUL");
      }
    );
    poolDb.query(
      "INSERT INTO login (user_id, hash) VALUES (?, MD5(?))",
      [user_id, password],
      (err, results) => {
        if (err) {
          reject(err);
        }
        return resolve("SIGN UP SUCCESSFUL");
      }
    );
  });
};

postsDb.incrementVotePost = (voted_user_id, post_id) => {
  return new Promise((resolve, reject) => {
    poolDb.query(
      "INSERT INTO voted (voted_user_id, post_id) VALUES (?,?)",
      voted_user_id,
      post_id,
      (err, results) => {
        if (err) {
          reject(err);
        }
        return resolve(results);
      }
    );
    poolDb.query(
      "UPDATE posts SET vote = vote + 1 WHERE post_id = ?",
      post_id,
      (err, results) => {
        if (err) {
          reject(err);
        }
        return resolve(results);
      }
    );
  });
};

postsDb.decrementVotePost = (voted_user_id, post_id) => {
  return new Promise((resolve, reject) => {
    poolDb.query(
      "DELETE FROM voted WHERE voted_user_id = ? AND post_id = ?",
      voted_user_id,
      post_id,
      (err, results) => {
        if (err) {
          reject(err);
        }
        return resolve(results);
      }
    );
    poolDb.query(
      "UPDATE posts SET vote = vote - 1 WHERE post_id = ?",
      post_id,
      (err, results) => {
        if (err) {
          reject(err);
        }
        return resolve(results);
      }
    );
  });
};

module.exports = postsDb;
