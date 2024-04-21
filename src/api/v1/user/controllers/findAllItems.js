const user = require("../../../../lib/user");
const {
  paginationGenerate,
  generatePaginationLinks,
} = require("../../../../utils/pagination");
const { transfromData } = require("../../../../utils/responseData");

const findAllItems = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const sortType = req.query.sortType || "desc";
  const sortBy = req.query.sortBy || "createdat";

  try {
    const { data, totalItems } = await user.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
    });

    const { pagination, totalPage } = paginationGenerate({
      page,
      limit,
      totalItems,
    });

    const links = generatePaginationLinks({
      path: req.baseUrl + req.path,
      page,
      totalPage,
      limit,
      sortType,
      sortBy,
    });

    // transfrom user data for response
    const users = transfromData({
      items: data,
      selection: ["id", "name", "email", "role", "updatedat", "createdat"],
      path: req.baseUrl + req.path,
    });

    // final response
    const response = {
      code: 200,
      data: users,
      pagination,
      links,
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = findAllItems;
