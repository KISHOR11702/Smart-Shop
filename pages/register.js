import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import withAuth from '../middleware/auth';

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password

    // Email regex: Must contain @ and a domain (e.g., .com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password regex: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address (e.g., user@example.com)');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character (@$!%*?&)');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong during registration');
            }

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            setSuccessMessage(data.message || 'Registration successful! Please sign in.');
            setTimeout(() => {
                router.push('/signin');
            }, 1500);
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Failed to register');
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
                    <h2 className="mt-6 text-3xl font-extrabold">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Or{' '}
                        <Link href="/signin" className="font-medium text-purple-400 hover:text-purple-500">
                            sign in to your existing account
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded mb-4" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Full name
                        </label>
                        <div className="mt-1">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>

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
                                autoComplete="new-password"
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

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                            Confirm password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-700 rounded-md bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-purple-400"
                            >
                                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}