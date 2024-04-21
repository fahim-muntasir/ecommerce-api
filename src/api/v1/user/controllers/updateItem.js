const userServices = require("../../../../lib/user");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const updateItem = async (req, res, next) => {
  const {id} = req.params;
  const body = req.body;

  try {
    // update user
    const updatedUser = await userServices.updateItem({data: body, id});

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: updatedUser,
      selection: ["id", "name", "email", "role", "updatedat", "createdat"],
    });

    const response = {
      code: 200,
      data,
      links: {
        self: req.originalUrl
      }
    }

    // send final response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = updateItem;