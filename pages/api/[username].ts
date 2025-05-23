import type { NextApiRequest, NextApiResponse } from 'next';
import { readDB } from '@/lib/db'; // Import dari file db.ts kamu

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { username } = req.query;

  try {
    const db = await readDB();

    type User = {
      username: string;
      img: string;
    };

    type Account = {
      users: User[];
    };

    const account = db.data.account.find((acc: Account) =>
      acc.users.some((user) => user.username === username)
    );

    if (!account) {
      return res.status(404).json({ error: 'Username Belum Terdaftar' });
    }

    return res.status(200).json(account);
  } catch (err) {
    console.error('Error reading database:', err);
    return res.status(500).json({ error: 'Failed to read database' });
  }
}