import { useUser } from '../contexts/userContext';
import Link from 'next/link';

export default function Profile() {
    const { user } = useUser();

    // Fallback if user is not logged in
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center py-12 px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Please sign in to view your profile.</h2>
                    <Link href="/signin" className="mt-4 inline-block text-purple-400 hover:text-purple-500">
                        Go to Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 pt-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">My Profile</h1>

                {/* Profile Header */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <span className="rounded-full bg-gray-700 h-24 w-24 flex items-center justify-center text-4xl text-gray-300">
                                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                            </span>
                            {/* Uncomment and add profilePicture URL if available */}
                            {/* <img
                src={user.profilePicture || '/default-avatar.png'}
                alt="Profile"
                className="rounded-full h-24 w-24 object-cover"
              /> */}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">{user.name || 'No Name'}</h2>
                            <p className="text-gray-400">{user.email}</p>
                            <Link href="/edit-profile" className="mt-2 inline-block text-purple-400 hover:text-purple-500">
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Account Information</h3>
                    <div className="space-y-2">
                        <p><strong>Name:</strong> {user.name || 'Not set'}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Member Since:</strong> 2025-04-20 (Update with actual date from backend)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}