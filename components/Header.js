import Link from 'next/link';

const Header = () => {
    return (
        <nav className="bg-gray-800 fixed w-full z-50 top-0">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <span className="text-3xl font-bold">🛍️</span>
                        <Link href="/" className="text-3xl font-bold bg-clip-text text-purple-400">
                            Smart Shop
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="hover:text-purple-400 transition-colors">
                            Home
                        </Link>
                        <Link href="/categories" className="hover:text-purple-400 transition-colors">
                            Categories
                        </Link>
                        <Link href="/deals" className="hover:text-purple-400 transition-colors">
                            Deals
                        </Link>
                        <Link href="/about" className="hover:text-purple-400 transition-colors">
                            About
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="/signin" className="hidden md:block hover:text-purple-400">
                            Sign In
                        </Link>
                        <span className="hidden md:block text-gray-600">|</span>
                        <Link href="/register" className="hidden md:block hover:text-purple-400">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;