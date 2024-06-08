import mysql2 from "mysql2";
const dbconnection = () => {
  const connection = mysql2.createConnection("mysql://uyeuxy6p0ldgea6i:xoe9h18e71ezZT1yPlVI@bbtf3axtodok47eannot-mysql.services.clever-cloud.com:3306/bbtf3axtodok47eannot");
  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("db Connected");
    }
  });
  return connection; 
};
export default dbconnection;
