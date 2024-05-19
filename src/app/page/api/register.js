export default function handler(req, res) {
    const { username, password } = req.body;
    if (username === 'user' && password === 'password') {
        res.status(200).json({ message: 'Registrasi berhasil' });
    } else {
        res.status(401).json({ message: 'Registrasi gagal' });
    }
}

