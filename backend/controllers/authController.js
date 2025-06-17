const jwt = require('jsonwebtoken');

// Fixed Admin Only
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (username === 'Raghava' && password === 'Raghava') {
    const token = jwt.sign({ username: 'Raghava', role: 'admin' }, process.env.JWT_SECRET);
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
