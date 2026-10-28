require('dotenv').config();
const app = require("./src/app");
const connectDb = require("./src/db/dbConnect");

const Port_Number = 3000;

const start = async()=>{

    try {
      // db
    
      await connectDb();
    
      app.listen(Port_Number, () => {
        console.log(`Server is running on port number ${Port_Number}`);
      });
    } catch (error) {
      console.error("Failed to db connect :- ", error.message);
      process.exit(1);
    }

}

start();