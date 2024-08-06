const mongoose = require("mongoose");

async function connect(){
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("Invalid Database Connection");
    }
}
module.exports = connect