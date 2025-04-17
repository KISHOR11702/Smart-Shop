// pages/api/products.js

import mongoose from 'mongoose';
import Product from '@/models/Product';

async function connectDB() {
    if (mongoose.connections[0].readyState) {
        return; // Already connected to the DB
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Stop the process if the DB connection fails
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await connectDB(); // Connect to MongoDB

            const products = await Product.find({});
            res.status(200).json({ products });

        } catch (error) {
            console.error('Fetch error:', error);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
