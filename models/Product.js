import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: null,
    },
    rating: {
        type: Number,
        default: null,
    },
    reviews: {
        type: Number,
        default: null,
    },
    source: {
        type: String,
        default: 'Google Shopping',
    },
    snippet: {
        type: String,
        default: null,
    },
    position: {
        type: Number,
        default: null,
    },
    product_id: {
        type: String,
        default: null,
    },
    old_price: {
        type: String,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

// Prevent duplicate compilation error in development
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;