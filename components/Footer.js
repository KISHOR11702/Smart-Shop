import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-800 mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Smart Shop</h3>
                        <p className="text-gray-400 mb-6">
                            Smart Shop helps you find the best deals across multiple online stores.
                            Compare prices, read reviews, and make informed purchases.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-purple-400">
                                Facebook
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-purple-400">
                                Twitter
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-purple-400">
                                Instagram
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-purple-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="hover:text-purple-400">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-it-works" className="hover:text-purple-400">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-purple-400">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-purple-400">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Subscribe to get notified about product launches, special offers and news.
                        </p>
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
    );
};

export default Footer;