TRUNCATE product, features, styles, photos, skus, cart;

CREATE TABLE product (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  slogan VARCHAR(255),
  description VARCHAR(500),
  category VARCHAR(50),
  default_price INT
);

CREATE TABLE features (
  feature_id SERIAL PRIMARY KEY,
  product_id INT,
  feature VARCHAR(30),
  value VARCHAR(50)
);

CREATE TABLE styles (
  style_id SERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR(50),
  sale_price INT,
  original_price INT,
  default_style BOOLEAN
);

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  style_id INT,
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE skus (
  sku_id SERIAL PRIMARY KEY,
  style_id INT,
  size VARCHAR(10),
  quantity VARCHAR(10)
);

CREATE TABLE cart (
  cart_id SERIAL PRIMARY KEY,
  user_session INT,
  product_id INT,
  active INT,
  sku_id INT,
  quantity INT
);

CREATE INDEX product_id_styles_index ON styles(product_id ASC);
CREATE INDEX sku_id_cart_index ON cart(sku_id ASC);
CREATE INDEX style_id_photos_index ON photos(style_id ASC);
CREATE INDEX style_id_skus_index ON skus(style_id ASC);
CREATE INDEX product_id_features_index ON features(product_id ASC);



COPY product FROM '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/productsClean.csv' WITH delimiter ',' NULL AS 'null' csv header;

COPY features FROM '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/featuresClean.csv'  WITH delimiter ',' NULL AS 'null' csv header;

COPY styles FROM '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/stylesClean.csv'  WITH delimiter ',' NULL AS ' null' csv header;

COPY photos FROM '/Users/KaitlynMichael/Desktop/Product-Overview-API/OriginalData/photos.csv' WITH delimiter ',' NULL AS 'null' csv header;

COPY skus FROM  '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/skusClean.csv' WITH delimiter ',' NULL AS 'null' csv header;

COPY cart FROM '/Users/KaitlynMichael/Desktop/Product-Overview-API/CleanData/cartClean.csv'  WITH delimiter ',' NULL AS 'null' csv header;




-- psql postgres
-- psql -U  KaitlynMichael productoverview  -W < db/schema.sql

