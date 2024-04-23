const { pool } = require("../db/dbConnection");

const Cart = {
  create: ({ customer, product, quantity }) =>
    pool.query(
      `
    INSERT INTO carts (customer, product, quantity)
    VALUES ($1, $2, $3)
    RETURNING
      carts.*,
      (SELECT jsonb_build_object(
         'id', products.id,
         'title', products.title,
         'avatar', products.avatar,
         'status', products.status,
         'price', products.price,
         'description', products.description,
         'category', products.category,
         'tags', products.tags,
         'createdat', products.createdat,
         'updatedat', products.updatedat
       ) AS product
       FROM products
       WHERE products.id = $2)
    `,
      [customer, product, quantity]
    ),
  find: ({ sortBy, sortOrder }) =>
    pool.query(
      `
    SELECT carts.*,
           (SELECT jsonb_build_object(
              'id', products.id,
              'title', products.title,
              'avatar', products.avatar,
              'status', products.status,
              'price', products.price,
              'description', products.description,
              'category', products.category,
              'tags', products.tags,
              'createdat', products.createdat,
              'updatedat', products.updatedat
            ) AS product
            FROM products
            WHERE products.id = carts.product)
    FROM carts
    ORDER BY ${sortBy.toLowerCase()} ${sortOrder}
    `
    ),
  findAllItems: () => pool.query("SELECT COUNT(*) FROM carts"),
  findItemById: (id) =>
    pool.query(
      `SELECT carts.*, 
      (SELECT jsonb_build_object(
        'id', products.id,
        'title', products.title,
        'avatar', products.avatar,
        'status', products.status,
        'price', products.price,
        'description', products.description,
        'category', products.category,
        'tags', products.tags,
        'createdat', products.createdat,
        'updatedat', products.updatedat
      ) AS product 
      FROM products 
      WHERE products.id = carts.product) AS product 
      FROM carts 
      WHERE id = $1`,
      [id]
    ),
  updateItem: ({ product, quantity, id }) =>
    pool.query({
      text: `
      UPDATE carts 
      SET 
        product = COALESCE($1, product), 
        quantity = COALESCE($2, quantity)
      WHERE id = $3 
      RETURNING *,
        (SELECT jsonb_build_object(
          'id', products.id,
          'title', products.title,
          'avatar', products.avatar,
          'status', products.status,
          'price', products.price,
          'description', products.description,
          'category', products.category,
          'tags', products.tags,
          'createdat', products.createdat,
          'updatedat', products.updatedat
        ) AS product
        FROM products
        WHERE products.id = $1) AS product
    `,
      values: [product, quantity, id],
    }),
  deleteItemById: (id) =>
    pool.query(`DELETE FROM carts WHERE id = $1 RETURNING *,
    (SELECT jsonb_build_object(
      'id', products.id,
      'title', products.title,
      'avatar', products.avatar,
      'status', products.status,
      'price', products.price,
      'description', products.description,
      'category', products.category,
      'tags', products.tags,
      'createdat', products.createdat,
      'updatedat', products.updatedat
    ) AS product
    FROM products
    WHERE products.id = $1) AS product`, [id]),
};

module.exports = Cart;
