// middleware/auth.js
import jwt from 'jsonwebtoken'; // You'll need to install jsonwebtoken: npm install jsonwebtoken

const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Use a strong, environment-specific secret

const withAuth = (handler) => async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Attach user information to the request object
        return handler(req, res); // Call the original API route handler
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default withAuth;