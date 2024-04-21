const { User } = require("../../models");

const existUser = async (email = "") => {
  try {
    const user = await User.findByEmail({ email });

    if (user.rows.length !== 0) {
      return user;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = { existUser };
