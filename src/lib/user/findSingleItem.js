const { Profile } = require("../../models");

// Define the function to find a single user by ID
const findSingleItem = async (id) => {
  try {
    // Query the database for the user with the specified ID
    const result = await Profile.findById(id);

    // Check if the user was found
    if (result.rows.length === 0) {
      return null; // Return null if user not found
    }

    // Return the user object
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};


const existUser = async (email = "") => {
  try {
    const user = await Profile.findByEmail({ email });

    if (user.rows.length !== 0) {
      return user.rows[0];
    }

    return false;
  } catch (error) {
    throw error;
  }
};

const findItemByGoogleId = async (id) => {
  try {
    // Query the database for the user with the specified ID
    const result = await Profile.findItemByGoogleId(id);

    // Check if the user was found
    if (result.rows.length === 0) {
      return null; // Return null if user not found
    }

    // Return the user object
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};


module.exports = { existUser, findSingleItem, findItemByGoogleId };
