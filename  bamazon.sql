DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL (10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire Stick", "Electronics", 39.99, 100),
("Laptop", "Electronics", 599.99, 2),
("Bluetooth Speaker","Electronics", 49.99, 20),
("Ray-Ban Sunglasses", "Accessories", 199.99, 40),
("Boots", "Clothing", 65, 10),
("T-shirt", "Clothing", 9.99, 1000),
("Teddy Bear", "Toys", 5, 500),
("Football", "Sports", 25, 100),
("Hat", "Clothing", 9.99, 40),
("Baseball Bat", "Sports", 49.99, 10);

SELECT * FROM products