// pages/api/auth/register.js
import bcrypt from 'bcryptjs';
import connectDB from '../../../utils/connetDB'; // Assuming you have a database connection utility

async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password.' });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Please provide a valid email address.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        try {
            const { db } = await connectDB();
            const usersCollection = db.collection('users');

            const existingUser = await usersCollection.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'Email address already registered.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                name,
                email,
                password: hashedPassword,
                createdAt: new Date(),
            };

            const result = await usersCollection.insertOne(newUser);

            if (result.insertedId) {
                return res.status(201).json({ message: 'Registration successful', user: { _id: result.insertedId, name, email } });
            } else {
                return res.status(500).json({ message: 'Failed to create user.' });
            }

        } catch (error) {
            console.error('Registration error:', error);
            return res.status(500).json({ message: 'Something went wrong during registration.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}

export default handler;