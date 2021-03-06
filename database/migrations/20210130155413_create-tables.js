exports.up = function (knex) {
  return knex.schema
    .createTable("countries", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable().unique();
      tbl.string("name_abbr", 128).notNullable().unique();
    })
    .createTable("categories", (tbl) => {
      tbl.increments();
      tbl.string("category_name", 128).notNullable().unique();
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("first_name", 128).notNullable();
      tbl.string("last_name", 128).notNullable();
      tbl.varchar("email", 128).notNullable().unique();
      tbl.varchar("username", 128).notNullable().unique().index();
      tbl.varchar("password", 128).notNullable();
      tbl.string("country", 128).notNullable();
      tbl.boolean("user_role").notNullable().defaultTo(false);
    })
    .createTable("items", (tbl) => {
      tbl.increments();
      tbl.string("item_name", 128).notNullable().unique();
      tbl.string("item_category").notNullable();
      tbl.string("item_description");
      tbl.decimal("item_price").notNullable();
      tbl.float("item_qty").notNullable();
      tbl.string("item_qty_measurement", 128);
    })
    .createTable("user_items", (tbl) => {
      tbl.increments();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("item_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("items")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("user_items")
    .dropTableIfExists("items")
    .dropTableIfExists("users")
    .dropTableIfExists("categories")
    .dropTableIfExists("countries");
};
