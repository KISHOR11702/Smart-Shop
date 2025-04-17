import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-blue-600 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-white text-3xl font-bold">Smart Shop</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="text-white hover:text-blue-200">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/products" className="text-white hover:text-blue-200">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-white hover:text-blue-200">
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
