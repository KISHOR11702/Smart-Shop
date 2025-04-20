// pages/api/protected.js
import withAuth from '../../middleware/auth';

async function handler(req, res) {
    res.status(200).json({ message: 'This is a protected API route', user: req.user });
}

export default withAuth(handler);