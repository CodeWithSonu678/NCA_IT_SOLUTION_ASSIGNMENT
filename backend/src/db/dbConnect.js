const mongoose = require('mongoose')

 async function connectDb() {
    
    try {
        
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("db connected successful.");
    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports = connectDb;