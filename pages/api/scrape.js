// pages/api/scrape.js
import mongoose from 'mongoose';
import axios from 'axios';
import Product from '@/models/Product';

// MongoDB connection utility
async function connectDB() {
    if (mongoose.connections[0].readyState) {
        return; // Already connected to MongoDB
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { query = "laptop" } = req.query;

        const apiKey = process.env.SERP_API_KEY; // Use environment variable
        const url = 'https://serpapi.com/search.json';

        try {
            const response = await axios.get(url, {
                params: {
                    engine: 'google_shopping',
                    q: query,
                    api_key: apiKey
                }
            });

            console.log('SerpAPI Google Shopping Response received');

            const products = response.data.shopping_results || [];
            console.log(`Found ${products.length} products in response`);

            // Connect to MongoDB
            await connectDB();

            // Clear old entries (optional, to keep the latest)
            await Product.deleteMany({});

            // Prepare data for insertion based on the ACTUAL response structure
            const productsToInsert = products
                .map(item => {
                    // Now using product_link instead of link based on the logs
                    if (!item.title || !item.product_link) {
                        console.log(`Skipping product - missing title or product_link:`, Object.keys(item));
                        return null;
                    }

                    return {
                        title: item.title,
                        price: item.price || (item.extracted_price ? `$${item.extracted_price}` : 'N/A'),
                        link: item.product_link, // This was the key issue - it's product_link, not link
                        thumbnail: item.thumbnail || null,
                        rating: item.rating || null,
                        reviews: item.reviews || null,
                        source: item.source || 'Google Shopping',
                        snippet: item.snippet || null,
                        // Store additional useful fields
                        position: item.position || null,
                        product_id: item.product_id || null,
                        old_price: item.old_price || null
                    };
                })
                .filter(item => item !== null);

            console.log(`Prepared ${productsToInsert.length} valid products for insertion`);

            // If valid products are found, insert them into DB
            if (productsToInsert.length > 0) {
                await Product.insertMany(productsToInsert);
                return res.status(200).json({
                    message: 'Products fetched and stored',
                    count: productsToInsert.length,
                    products: productsToInsert // Only return the first 5 products to keep response size manageable
                });
            } else {
                return res.status(400).json({
                    message: 'No valid products to insert',
                    availableFields: products.length > 0 ? Object.keys(products[0]) : [],
                    sampleProduct: products.length > 0 ? products[0] : null
                });
            }

        } catch (error) {
            console.error('Google Shopping Error:', error.response?.data || error.message);
            res.status(500).json({
                error: 'Failed to fetch and store products',
                details: error.response?.data || error.message
            });
        }

    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}