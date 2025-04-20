// pages/api/auth/signin.js
import bcrypt from 'bcryptjs'; // For password comparison
import jwt from 'jsonwebtoken';
import connectDB from '../../../utils/connetDB'; // Assuming you have a database connection utility

const secretKey = process.env.JWT_SECRET;

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }

        try {
            const { db } = await connectDB();
            const usersCollection = db.collection('users');
            const user = await usersCollection.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            // Authentication successful, now generate JWT
            const token = jwt.sign(
                { userId: user._id, email: user.email, name: user.name }, // Payload
                secretKey,
                { expiresIn: '1h' } // Token expiration time
            );

            return res.status(200).json({ message: 'Sign in successful', token, user: { _id: user._id, email: user.email, name: user.name } });

        } catch (error) {
            console.error('Sign in error:', error);
            return res.status(500).json({ message: 'Something went wrong during sign in.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}

export default handler;