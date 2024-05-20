export default function handler(req, res) {
    const { username, password } = req.body;

    if (username === 'user' && password === 'password') {
        res.status(200).json({ message: 'Login berhasil' });
    } else {
        res.status(401).json({ message: 'Username atau password salah' });
    }
}

