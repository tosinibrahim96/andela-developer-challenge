const createUsers = `CREATE TABLE IF NOT EXISTS
users(
   id SERIAL PRIMARY KEY NOT NULL,
   email VARCHAR(40) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   role VARCHAR(20) NOT NULL DEFAULT('attendant'),
   first_name VARCHAR(150) NOT NULL DEFAULT('John Doe'),
   mobile_number VARCHAR(20) NOT NULL DEFAULT('08076543241'),
   image_url VARCHAR(150) NOT NULL DEFAULT('https://i.imgur.com/27DUH5b.jpg'),
   sales INTEGER NOT NULL DEFAULT(0)
);`;

const createCategories = `CREATE TABLE IF NOT EXISTS
categories(
   id SERIAL PRIMARY KEY NOT NULL,
   name VARCHAR(40) NOT NULL,
   image_url VARCHAR(150) NOT NULL,
   short_desc VARCHAR(225) NOT NULL
);`;

const createProducts = `CREATE TABLE IF NOT EXISTS
products(
   id SERIAL PRIMARY KEY NOT NULL,
   name TEXT NOT NULL,
   cat_id INTEGER NOT NULL,
   price INTEGER NOT NULL,
   quantity INTEGER NOT NULL,
   description VARCHAR(40) NOT NULL,
   image_url VARCHAR(150) NOT NULL DEFAULT('https://i.imgur.com/UBDlxxg.jpg'),
   FOREIGN KEY(cat_id) REFERENCES categories(id) ON DELETE CASCADE
);`;

const salesInfo = `CREATE TABLE IF NOT EXISTS
salesinfo(
   id SERIAL PRIMARY KEY NOT NULL,
   price INTEGER NOT NULL
);`;

const salesItems = `CREATE TABLE IF NOT EXISTS
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
);`;

const addAdmin = `INSERT INTO users(email, password, role)
VALUES('admin@mail.com', 'md596e79218965eb72c92a549dd5a330112', 'admin');
`;

const addAttendant = `INSERT INTO users(email, password)
VALUES('user@mail.com', 'md596e79218965eb72c92a549dd5a330112');
`;

const tables = `${createUsers} ${createCategories} ${createProducts} ${salesInfo} ${salesItems} ${addAdmin} ${addAttendant}`;
export default tables;