import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/userContext';

const Header = () => {
    const { user, setUser } = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-gray-800 fixed w-full z-50 top-0">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <span className="text-3xl font-bold">🛍️</span>
                        <Link href="/" className="text-3xl font-bold bg-clip-text text-purple-400"> Smart Shop</Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
                        <Link href="#" className="hover:text-purple-400 transition-colors">Categories</Link>
                        <Link href="#" className="hover:text-purple-400 transition-colors">Deals</Link>
                        <Link href="#" className="hover:text-purple-400 transition-colors">About</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <span className="rounded-full bg-gray-700 h-8 w-8 flex items-center justify-center text-gray-300">
                                        {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="text-gray-400 hidden md:inline">{user.name || user.email}</span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-50">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Profile
                                        </Link>

                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600 hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/signin" className="hidden md:block hover:text-purple-400">Sign In</Link>
                                <span className="hidden md:block text-gray-600">|</span>
                                <Link
                                    href="/register"
                                    className="hidden md:block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;