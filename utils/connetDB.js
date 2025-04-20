// utils/connectDB.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (!mongoose.connections[0].readyState) {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: 'mokesh' // Add your database name here
            });
            console.log('MongoDB connected');
        }
        return mongoose.connection; // Return the connection object
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;