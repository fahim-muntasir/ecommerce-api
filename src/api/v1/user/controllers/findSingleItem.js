const userService = require("../../../../lib/user");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const findSingleItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    // find user by id
    const user = await userService.findSingleItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: user,
      selection: ["id", "name", "email", "role", "updatedat", "createdat"],
    });

    const response = {
      code: 200,
      data,
      links: {
        self: req.originalUrl
      },
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleItem;
