// Connection with the MongoDB database setup using mongoose
const mongoose = require ('mongoose');

const connectDB = async () => {
    try {
        // Reference the conncection string store in .env file
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB