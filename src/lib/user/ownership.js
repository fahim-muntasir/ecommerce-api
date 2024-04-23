const { User } = require("../../models");
const { notFoundError } = require("../../utils/error");

const ownership = async ({ resourceId = "", userId = "" }) => {
  try {
    const user = await User.findItemById(resourceId);

    if (!user) {
      throw notFoundError();
    }

    if (user.rows[0]?.id === userId) {

      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = ownership;