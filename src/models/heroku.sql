-- CREATE TABLE IF NOT EXISTS
--       users(
--         id SERIAL PRIMARY KEY NOT NULL,
--         email VARCHAR(40) UNIQUE NOT NULL,
--         password VARCHAR(255) NOT NULL,
--         role  VARCHAR(20) NOT NULL DEFAULT ('attendant')
--       );

-- CREATE TABLE IF NOT EXISTS
--       categories(
--         id SERIAL PRIMARY KEY NOT NULL,
--         name VARCHAR(40) NOT NULL
--       );


-- CREATE TABLE IF NOT EXISTS
--   products(
--     id SERIAL PRIMARY KEY NOT NULL,
--     name TEXT NOT NULL,
--     cat_id INTEGER NOT NULL,
--     price INTEGER NOT NULL,
--     quantity INTEGER NOT NULL,
--     description VARCHAR(40) NOT NULL,
--     FOREIGN KEY(cat_id) REFERENCES categories(id) ON DELETE CASCADE
--   );




-- CREATE TABLE IF NOT EXISTS
--   sales(
--     id SERIAL PRIMARY KEY NOT NULL,
--     product_id INTEGER NOT NULL,
--     user_id INTEGER NOT NULL,
--     FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
--     FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE  
--     );


-- INSERT INTO users(email, password,role) 
-- VALUES ('admin@mail.com', 'md596e79218965eb72c92a549dd5a330112' ,'admin');
ALTER TABLE products 
ADD COLUMN image_url VARCHAR(150) NOT NULL DEFAULT ('https://imgur.com/S3LYe5b');