import dbconnection from "../../../../database/connection.js";

const connection = dbconnection();
//1- Create order.
export const createOrder = (req, res, next) => {
  const newOrder = req.body;
  connection.query("INSERT INTO orders SET ?", newOrder, (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Database error", error });
    }
    res.status(201).json({ message: "Order added successfully", result });
  });
};
//2- API to calculate the average order value.
export const averageOrder = (req, res, next) => {
  const { customer_id } = req.body;
  connection.query(
    "SELECT AVG(totalAmount) FROM `orders` WHERE customer_id = ?;",
    [customer_id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Database error", error });
      }
      res.status(201).json(result[0]);
    }
  );
};
// 3- Write a query to list all customers who have not made any orders.
export const notAnyOrders = (req, res, next) => {
  const codeQuery = "SELECT customer.id, customer.firstName, orders.quantity FROM customer LEFT JOIN orders ON customer.id = orders.customer_id WHERE orders.quantity IS NULL;";
  connection.query(codeQuery, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Database error", error });
      }
      res.status(201).json(result[0]);
    }
  );
};
//SELECT customer.id , COUNT(orders.quantity) FROM `orders` JOIN customer ON customer.id = orders.customer_id GROUP BY customer.id;
//4- API to find the customer who has purchased the most items in total.
export const purchItem = (req , res , next)=>{
  const query = "SELECT customer.id , customer.firstName , SUM(orders.quantity) AS orders_TotalAmount FROM `orders` JOIN customer ON customer.id = orders.customer_id GROUP BY customer.id  ORDER BY SUM(orders.quantity) DESC LIMIT 1;"
  connection.query(query ,     (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Database error", error });
    }
    res.status(201).json(result[0]);
  })
}
//5- API to list the top 10 customers who have spent the most money.
export const purchMoney = (req , res , next)=>{
  const query = "SELECT customer.id , customer.firstName , SUM(orders.totalAmount) AS orders_TotalAmount FROM `orders` JOIN customer ON customer.id = orders.customer_id GROUP BY customer.id  ORDER BY SUM(orders.totalAmount) DESC LIMIT 10;"
  connection.query(query ,     (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Database error", error });
    }
    res.status(201).json(result[0]);
  })
}
//6- API to list all customers who have made at least 5 orders.
export const customerOrder = (req , res , next)=>{
  const query = "SELECT customer.id, customer.firstName, COUNT(orders.id) AS order_count FROM customer JOIN orders ON customer.id = orders.customer_id GROUP BY customer.id, customer.firstName HAVING COUNT(orders.id) >= 5;"
  connection.query(query ,     (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Database error", error });
    }
    res.status(201).json(result[0]);
  })
}
//7- API to find the percentage of customers who have made more than one order.
export const orderCount = (req , res , next)=>{
  const query = "SELECT customer.id, customer.firstName, COUNT(orders.quantity) AS order_count FROM customer JOIN orders ON customer.id = orders.customer_id GROUP BY customer.id, customer.firstName HAVING COUNT(orders.quantity) > 1;"
  connection.query(query ,     (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Database error", error });
    }
    res.status(201).json(result[0]);
  })
}
//8- API to find the customer who has made the earliest order.
export const earliestOrder = (req , res , next)=>{
  const query = "SELECT customer.id , customer.firstName , orders.id FROM `orders` JOIN customer ON customer.id = orders.id ORDER BY `orders`.`id` ASC LIMIT 1;"
  connection.query(query ,     (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Database error", error });
    }
    res.status(201).json(result[0]);
  })
}