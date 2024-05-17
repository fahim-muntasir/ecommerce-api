const { pool } = require("../db/dbConnection");

const Profile = {
  create: ({ name, email, password, role, googleid }) =>
    pool.query(
      "INSERT INTO profile (name, email, password, role, googleid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, role, googleid]
    ),
  findById: (id) => pool.query("SELECT * FROM profile WHERE id = $1", [id]),
  findItemByGoogleId: (id) =>
    pool.query("SELECT * FROM profile WHERE googleid = $1", [id]),
};

module.exports = Profile;
