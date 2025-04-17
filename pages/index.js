import { useEffect, useState } from 'react';

export default function Home() {
    const [query, setQuery] = useState('trending products');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(82); // 1 USD = 82 INR
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState(null);

    const fetchProducts = async (searchQuery) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/scrape?query=${searchQuery}`);
            const data = await res.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            fetchProducts(query);
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts(query);
    };

    const convertToINR = (priceInUSD) => {
        const priceNumber = parseFloat(priceInUSD.replace(/[^\d.-]/g, '')); // Remove non-numeric characters
        return priceNumber ? priceNumber * exchangeRate : 0;
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (category !== 'All') {
            setQuery(category.toLowerCase());
            fetchProducts(category.toLowerCase());
        }
    };

    const sortProducts = (order) => {
        setSortOrder(order);
        let sorted = [...products];

        if (order === 'low-to-high') {
            sorted.sort((a, b) => convertToINR(a.price) - convertToINR(b.price));
        } else if (order === 'high-to-low') {
            sorted.sort((a, b) => convertToINR(b.price) - convertToINR(a.price));
        } else if (order === 'rating') {
            sorted.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
        }

        setProducts(sorted);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Navigation */}
            <nav className="bg-gray-800 fixed w-full z-50 top-0">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <span className="text-3xl font-bold">🛍️</span>
                            <a href="/" className="text-3xl font-bold bg-clip-text text-purple-400"> Smart Shop</a>
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
                            <a href="#" className="hover:text-purple-400 transition-colors">Categories</a>
                            <a href="#" className="hover:text-purple-400 transition-colors">Deals</a>
                            <a href="#" className="hover:text-purple-400 transition-colors">About</a>
                        </div>

                        <div className="flex items-center space-x-4">
                            <a href="#" className="hidden md:block hover:text-purple-400">Sign In</a>
                            <span className="hidden md:block text-gray-600">|</span>
                            <a href="#" className="hidden md:block hover:text-purple-400">Register</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-16">
                <div className="h-96 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                                Find the Best Deals
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                One search, Infinite choices.
                            </p>

                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="flex justify-center mb-8">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="px-6 py-3 w-full md:w-96 rounded-l-lg border-r-0 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-gray-900 bg-white"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition"
                                >
                                    Search
                                </button>
                            </form>

                            <div className="text-sm text-gray-400">
                                Popular Searches: Laptops, Smartphones, Headphones, Gaming
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-12">
                    <div className="text-center text-gray-400">
                        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p>Searching across stores...</p>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Filter Section */}
                <div className="bg-gray-800 rounded-lg p-4 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <h2 className="text-xl font-semibold mb-2 md:mb-0">Filters</h2>
                        <div className="flex flex-wrap gap-2">
                            <button
                                className={`px-4 py-2 ${sortOrder === 'low-to-high' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-md text-sm transition-colors`}
                                onClick={() => sortProducts('low-to-high')}
                            >
                                Price: Low to High
                            </button>
                            <button
                                className={`px-4 py-2 ${sortOrder === 'high-to-low' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-md text-sm transition-colors`}
                                onClick={() => sortProducts('high-to-low')}
                            >
                                Price: High to Low
                            </button>
                            <button
                                className={`px-4 py-2 ${sortOrder === 'rating' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-md text-sm transition-colors`}
                                onClick={() => sortProducts('rating')}
                            >
                                Rating
                            </button>

                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            className={`px-4 py-2 ${activeCategory === 'All' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-full text-sm transition-colors`}
                            onClick={() => handleCategoryClick('All')}
                        >
                            All
                        </button>
                        <button
                            className={`px-4 py-2 ${activeCategory === 'Electronics' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-full text-sm transition-colors`}
                            onClick={() => handleCategoryClick('Electronics')}
                        >
                            Electronics
                        </button>
                        <button
                            className={`px-4 py-2 ${activeCategory === 'Computers' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-full text-sm transition-colors`}
                            onClick={() => handleCategoryClick('Computers')}
                        >
                            Computers
                        </button>
                        <button
                            className={`px-4 py-2 ${activeCategory === 'Accessories' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-full text-sm transition-colors`}
                            onClick={() => handleCategoryClick('Accessories')}
                        >
                            Accessories
                        </button>
                        <button
                            className={`px-4 py-2 ${activeCategory === 'Smartphones' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-full text-sm transition-colors`}
                            onClick={() => handleCategoryClick('Smartphones')}
                        >
                            Smartphones
                        </button>
                        <button
                            className={`px-4 py-2 ${activeCategory === 'Audio' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} rounded-full text-sm transition-colors`}
                            onClick={() => handleCategoryClick('Audio')}
                        >
                            Audio
                        </button>
                    </div>
                </div>

                {products.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Search Results</h2>
                        <p className="text-gray-400">Found {products.length} products for "{query}"</p>
                    </div>
                )}

                {/* Product Grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product, idx) => (
                        <a
                            key={idx}
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 flex flex-col h-full"
                        >
                            {product.thumbnail && (
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="w-full h-full object-contain bg-gray-700 p-2"
                                    />
                                    {product.source && (
                                        <div className="absolute top-2 left-2 bg-purple-600 text-xs text-white px-2 py-1 rounded">
                                            {product.source}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
                                <p className="text-xl text-purple-400 font-bold mb-2">
                                    ₹{convertToINR(product.price).toFixed(2)}
                                </p>
                                {product.rating && (
                                    <div className="flex items-center mb-2">
                                        <div className="text-yellow-500 mr-1">⭐</div>
                                        <span>{product.rating}</span>
                                        <span className="text-gray-400 text-sm ml-2">({product.reviews} reviews)</span>
                                    </div>
                                )}
                                <div className="mt-auto pt-4 flex justify-between items-center">
                                    <span className="text-sm text-gray-400">
                                        View Details
                                    </span>
                                    <div className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                        Shop Now
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* No Products Found */}
                {!loading && products.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold mb-2">No products found</h2>
                        <p className="text-gray-400">Try different keywords or browse categories</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 mt-16">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">About Smart Shop</h3>
                            <p className="text-gray-400 mb-6">Smart Shop helps you find the best deals across multiple online stores. Compare prices, read reviews, and make informed purchases.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-purple-400">Facebook</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400">Twitter</a>
                                <a href="#" className="text-gray-400 hover:text-purple-400">Instagram</a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-purple-400">Home</a></li>
                                <li><a href="#" className="hover:text-purple-400">Categories</a></li>
                                <li><a href="#" className="hover:text-purple-400">How It Works</a></li>
                                <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                            <p className="text-gray-400 mb-4">Subscribe to get notified about product launches, special offers and news.</p>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                                />
                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition-colors">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Smart Shop. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}