const express = require('express');
const odbc = require('odbc');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await odbc.connect('DSN=MemberLogin');
    const query = `INSERT INTO LoginTable (UserName, Password) VALUES (?, ?)`;
    await connection.query(query, [username, password]);
    await connection.close();

    res.json({ message: 'Signup successful!' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
//login page
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await odbc.connect('DSN=MemberLogin');
    const result = await connection.query(
      `SELECT * FROM LoginTable WHERE UserName = ? AND Password = ?`,
      [username, password]
    );

    await connection.close();

    if (result.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
