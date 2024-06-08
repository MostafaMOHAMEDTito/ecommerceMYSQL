import dbconnection from "../../../../database/connection.js";
import bcryptjs from "bcryptjs";

const connect = dbconnection();
// 1- sign up (customer must be unique).
export const signUp = (req, res, next) => {
  const { email, password } = req.body;
  // Check if the email already exists
  connect.query(
    "SELECT * FROM customer WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", err });
      }
      if (result.length) {
        return res.status(409).json({ message: "Email already exists" });
      }
      const hashPassword = bcryptjs.hashSync(password, 8);
      // Insert the new user into the database
      req.body.password = hashPassword;

      connect.query("INSERT INTO customer SET ?", req.body, (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Database error", error });
        }

        res
          .status(201)
          .json({ message: "User registered successfully", result });
      });
    }
  );
};

//2- login.

export const login = (req, res, next) => {
  const { email, password } = req.body;
  connect.query(
    "SELECT * FROM customer WHERE email = ?",
    [email],
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Database error", error });
      }
      if (!result.length) {
        return res
          .status(400)
          .json({ message: "Email or password is incorrect" });
      }

      const match = bcryptjs.compareSync(password, result[0].password);
      if (!match) {
        console.log(result[0].password);
        console.log(match);
        return res
          .status(400)
          .json({ message: "Email or password is incorrect" });
      }

      res
        .status(200)
        .json({ message: "Login successful", user: result[0].firstName });
    }
  );
};
