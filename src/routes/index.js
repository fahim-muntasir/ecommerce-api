const router = require("express").Router();

// controller import 
const userController = require("../api/v1/user");
const productController = require("../api/v1/product");
const orderController = require("../api/v1/order");
const cartController = require("../api/v1/cart");
const authController = require("../api/v1/auth");

// middleware imports
const authMiddleware = require("../middleware/auth");
const authorizeMiddleware = require("../middleware/authorize");
const ownershipMiddleware = require("../middleware/ownership");

// api health route
router.get("/health", (_req, res) => {
  res.status(200).json({
    health: "Ok",
  });
});


// ======== api/v1 auth route start ========
router.route("/v1/auth/signin").post(authController.signin);
// ======== api/v1 auth route end ========

// ======== api/v1 user route start ========
router
  .route("/v1/users")
  .get(
    authMiddleware,
    authorizeMiddleware(["admin"]),
    userController.findAllItems
  )
  .post(userController.create);

router
  .route("/v1/users/:id")
  .get(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("User"),
    userController.findSingleItem
  )
  .patch(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("User"),
    userController.updateItem
  )
  .delete(
    authMiddleware,
    authorizeMiddleware(["admin"]),
    ownershipMiddleware("User"),
    userController.deleteItem
  );

router.get("/v1/users/:id/orders", () => {});
// ======== api/v1 user route end ========

// ======== api/v1 product route start ========
router
  .route("/v1/products")
  .get(productController.findAllItems)
  .post(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    productController.create
  );

router
  .route("/v1/products/:id")
  .get(productController.findSingleItem)
  .patch(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("Article"),
    productController.updateItem
  )
  .delete(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("Article"),
    productController.deleteItem
  );
// ======== api/v1 product route end ========

// ======== api/v1 cart route start =========
router
  .route("/v1/carts")
  .get(cartController.findAllItems)
  .post(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    cartController.create
  );

router
  .route("/v1/carts/:id")
  .get(cartController.findSingleItem)
  .patch(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("Article"),
    cartController.updateItem
  )
  .delete(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("Article"),
    cartController.deleteItem
  );
// ======== api/v1 cart route end =========

// ======== api/v1 order route start ========
router
  .route("/v1/orders")
  .get(orderController.findAllItems)
  .post(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    orderController.create
  );

router
  .route("/v1/orders/:id")
  .get(orderController.findSingleItem)
  .patch(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("Article"),
    orderController.updateItem
  )
  .delete(
    authMiddleware,
    authorizeMiddleware(["admin", "user"]),
    ownershipMiddleware("Article"),
    orderController.deleteItem
  );
// ======== api/v1 order route end ========

module.exports = router;