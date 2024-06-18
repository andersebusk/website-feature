const { Client } = require('pg');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { company, email, phone, country } = req.body;

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();
      console.log('Connected to PostgreSQL');

      const query = `
        INSERT INTO users (company, email, phone, country)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [company, email, phone, country];
      const result = await client.query(query, values);

      res.status(200).json({ user: result.rows[0] });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
