const { pool } = require("../../../../db/dbConnection");
const { generateBadRequestError } = require("../../../../utils/error");
const user = require("../../../../lib/user");

const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = generateBadRequestError({
        properties: { name, email, password },
      });
      return next(error);
    }

    // Insert user into the database
    const newUser = await user.create({ name, email, password });

    const responseData = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdat,
      updatedAt: newUser.updatedat,
    };

    const response = {
      code: 201,
      data: responseData,
      links: {
        self: `/users/${newUser.id}`,
      },
    };

    // final response
    res.status(201).json(response);
  } catch (err) {
    if (err.code === "23505") {
      const error = generateBadRequestError({
        msg: "Email address is already in use",
      });
      return next(error);
    }
    console.log(err);
    next(err);
  }
};

module.exports = create;
