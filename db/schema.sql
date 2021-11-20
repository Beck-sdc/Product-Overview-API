TRUNCATE product, features, styles, photos, skus, cart;

CREATE TABLE product (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "slogan" VARCHAR(255),
  "description" VARCHAR(500),
  "category" VARCHAR(50),
  "default_price" INT
);

CREATE TABLE "features" (
  "id" SERIAL PRIMARY KEY,
  "product_id" INT,
  "feature" VARCHAR(30),
  "value" VARCHAR(50)
);

CREATE TABLE "styles" (
  "id" SERIAL PRIMARY KEY,
  "product_id" INT,
  "name" VARCHAR(50),
  "sale_price" INT,
  "original_price" INT,
  "default_style" BOOLEAN
);

CREATE TABLE "photos" (
  "id" SERIAL PRIMARY KEY,
  "style_id" INT,
  "url" VARCHAR(500),
  "thumbnail_url" VARCHAR(500)
);

CREATE TABLE "skus" (
  "id" SERIAL PRIMARY KEY,
  "style_id" INT,
  "size" VARCHAR(10),
  "quantity" VARCHAR(10)
);

CREATE TABLE "cart" (
  "id" SERIAL PRIMARY KEY,
  "user_session" INT,
  "product_id" INT,
  "active" INT
);

ALTER TABLE "features" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "styles" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "photos" ADD FOREIGN KEY ("style_id") REFERENCES "styles" ("id");

ALTER TABLE "skus" ADD FOREIGN KEY ("style_id") REFERENCES "styles" ("id");

ALTER TABLE "cart" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");



COPY product FROM '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/productsClean.csv' WITH delimiter ',' NULL AS ' null' csv header;

COPY features FROM '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/featuresClean.csv'  WITH delimiter ',' NULL AS 'null' csv header;

COPY styles FROM '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/stylesClean.csv'  WITH delimiter ',' NULL AS ' null' csv header;

COPY photos FROM '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/photosClean.csv' WITH delimiter ',' NULL AS 'null' csv header;

COPY skus FROM  '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/skusClean.csv' WITH delimiter ',' NULL AS ' null' csv header;

COPY cart FROM '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/cartClean.csv'  WITH delimiter ',' NULL AS 'null' csv header;



-- psql -U  KaitlynMichael productoverview  -W < db/schema.sql

