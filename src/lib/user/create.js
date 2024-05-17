const { Profile } = require("../../models");
const validateEmail = require("../../utils/emailvalidate");
const { generateBadRequestError } = require("../../utils/error");

const create = async ({ name, email, password, role = "user", googleid }) => {
  try {
    if (!validateEmail(email)) {
      throw generateBadRequestError({
        properties: { email },
        msg: "Email is not valid!",
      });
    }

    const user = await Profile.create({
      name,
      email,
      password,
      role,
      googleid,
    });

    return user.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = create;
