DROP TABLE IF EXISTS salesitems;
DROP TABLE IF EXISTS salesinfo;

CREATE TABLE IF NOT EXISTS
  salesinfo(
    id SERIAL PRIMARY KEY NOT NULL,
    price INTEGER NOT NULL  
    );

CREATE TABLE IF NOT EXISTS
  salesitems(
    id SERIAL PRIMARY KEY NOT NULL,
    product_id INTEGER NOT NULL,
    sale_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    item_price INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
    FOREIGN KEY(sale_id) REFERENCES salesinfo(id) ON DELETE CASCADE  
    );
