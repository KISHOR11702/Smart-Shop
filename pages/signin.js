import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '../contexts/userContext'; // Import the UserContext
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Import eye icons from react-icons

export default function SignIn() {
    const router = useRouter();
    const { setUser } = useUser(); // Access setUser from context to update globally
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); // State for Remember me
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const { redirect } = router.query;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, rememberMe }), // Send rememberMe to backend
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Something went wrong');
                return;
            }

            // Store user data in localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Update the global user state via context
            setUser(data.user);

            // Redirect to the original page or home
            router.push(redirect || '/');
        } catch (err) {
            console.error('Sign-in error:', err);
            setError(err.message || 'Failed to sign in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <Link href="/" className="flex items-center justify-center">
                        <span className="text-3xl font-bold">🛍️</span>
                        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                            Smart Shop
                        </span>
                    </Link>
                    <h2 className="mt-6 text-3xl font-extrabold">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Or{' '}
                        <Link href="/register" className="font-medium text-purple-400 hover:text-purple-500">
                            create a new account
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-700 rounded-md bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-purple-400"
                            >
                                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded bg-gray-700"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-purple-400 hover:text-purple-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div>
                            <a
                                href="#"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600"
                            >
                                <span className="sr-only">Sign in with Google</span>
                                Google
                            </a>
                        </div>

                        <div>
                            <a
                                href="#"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600"
                            >
                                <span className="sr-only">Sign in with Facebook</span>
                                Facebook
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}