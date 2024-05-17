const { forbiddenError } = require("../utils/error");
const userServices = require("../lib/profile");
const cartServices = require("../lib/cart");

const ownership = (model) => async (req, _res, next) => {

  if (req.user.role === "admin") {
    return next();
  }

  try {
    // if user admin then this all condition will ingone
    switch (model) {
      case "User":
        const isUserOwner = await userServices.checkOwnership({
          resourceId: req.params.id,
          userId: req.user.id,
        });

        if (!isUserOwner) {
          return next(forbiddenError("Permission denied!"));
        }

        return next();

      case "Cart":
        const isArticleOwner = await cartServices.checkOwnership({
          resourceId: req.params.id,
          userId: req.user.id,
        });

        if (!isArticleOwner) {
          return next(forbiddenError("Permission denied!"));
        }

        return next();

      default:
        return next(forbiddenError("Permission denied!"));
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = ownership;
