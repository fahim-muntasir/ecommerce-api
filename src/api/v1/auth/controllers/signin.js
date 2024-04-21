const { tokenGenerator } = require("../../../../lib/auth");
const { getTransfromSingleData } = require("../../../../utils/responseData");
const {
  generateBadRequestError,
  authenticateError,
} = require("../../../../utils/error");
const userService = require("../../../../lib/user");

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = generateBadRequestError({ email, password });
      next(error);
    }

    // Check if the user exists
    const user = await userService.existUser(email);

    if (!user) {
      throw authenticateError("Invalid credentials!");
    }

    if (password !== user.rows[0].password) {
      throw authenticateError("Invalid credentials!");
    }

    const payload = getTransfromSingleData({
      item: user.rows[0],
      selection: ["id", "name", "email", "role"],
    });

    // generate a token
    const token = await tokenGenerator(payload);

    // and send a response
    const response = {
      code: 200,
      data: {
        token,
      },
      links: {
        self: `/users/${user.rows[0].id}`,
      },
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = signin;
