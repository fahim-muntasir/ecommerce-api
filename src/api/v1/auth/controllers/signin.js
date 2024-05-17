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

    if (password !== user.password) {
      throw authenticateError("Invalid credentials!");
    }

    const payload = getTransfromSingleData({
      item: user,
      selection: ["id", "name", "email", "role"],
    });

    // generate a token
    const token = await tokenGenerator(payload);

    // and send a response
    const response = {
      code: 200,
      data: {
        token,
        user: payload
      },
      links: {
        self: `/users/${user.id}`,
      },
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = signin;
