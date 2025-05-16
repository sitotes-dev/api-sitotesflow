import { readDB, writeDB } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const db = readDB();
    const { action, payload } = req.body || {};

    // Validasi awal untuk req.body
    if (req.method === 'POST' && (!action || !payload)) {
        return res.status(400).json({ error: 'Action and payload are required' });
    }

    if (req.method === 'GET') {
        return res.status(200).json({
            by: 'sitotes 2025',
            instagram: '@m.saiful.anam.r',
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = db.data;
    try {
        if (action === 'edit_admin_pass') {
            if (!payload?.newpass) {
                return res.status(400).json({ error: 'New password is required' });
            }
            data.admin.pass = payload.newpass;
            writeDB(db);
            return res.status(200).json({ message: 'Admin password updated' });
        }

        if (action === 'add_transaction') {
            const { user, transaction } = payload;
            if (!user || !transaction) {
                return res.status(400).json({ error: 'User and transaction are required' });
            }

            const account = data.account.find((acc: { users: { username: string; img: string }[], transaction: [] }) =>
              acc.users.some((u: { username: string; img: string }) => u.username === user)
            );
            if (!account) return res.status(404).json({ error: 'User not found' });

            account.transaction.push(transaction);
            writeDB(db);
            return res.status(200).json({ message: 'Transaction added' });
        }

        if (action === 'delete_transaction') {
            const { user, date } = payload;
            if (!user || !date) {
                return res.status(400).json({ error: 'User and date are required' });
            }

            const account = data.account.find(acc: { users:[] } => acc.users.some((u) => u.username === user));
            if (!account) return res.status(404).json({ error: 'User not found' });

            account.transaction = account.transaction.filter(t => t.date !== date);
            writeDB(db);
            return res.status(200).json({ message: 'Transaction deleted' });
        }

        if (action === 'add_user_alias') {
            const { user, new_user } = payload;
            if (!user || !new_user) {
                return res.status(400).json({ error: 'User and new_user are required' });
            }

            const account = data.account.find(acc => acc.users.some((u: { username: string; img: string }) => u.username === user));
            if (!account) return res.status(404).json({ error: 'User not found' });

            if (!account.users.includes(new_user)) {
                account.users.push(new_user);
            }

            writeDB(db);
            return res.status(200).json({ message: 'User alias added' });
        }

        if (action === 'delete_user_alias') {
            const { user, delete_user } = payload;
            if (!user || !delete_user) {
                return res.status(400).json({ error: 'User and delete_user are required' });
            }

            const account = data.account.find(acc => acc.users.some((u: { username: string; img: string }) => u.username === user));
            if (!account) return res.status(404).json({ error: 'User not found' });

            if (user === delete_user) {
                return res.status(400).json({ error: 'Cannot delete yourself' });
            }

            account.users = account.users.filter(u => u !== delete_user);
            writeDB(db);
            return res.status(200).json({ message: 'User alias deleted' });
        }

        if (action === 'add_account') {
            const { admin_pass, user_data, username } = payload;
            if (!admin_pass || !user_data || !username) {
                return res.status(400).json({ error: 'Admin password, user_data, and username are required' });
            }

            if (admin_pass !== data.admin.pass) {
                return res.status(403).json({ error: 'Invalid admin password' });
            }

            const exists = data.account.some(acc => acc.users.some((u: { username: string; img: string }) => u.username === username));
            if (exists) return res.status(400).json({ error: 'Username already exists' });

            user_data.users = [username];
            data.account.push(user_data);

            writeDB(db);
            return res.status(200).json({ message: 'New account created' });
        }

        return res.status(400).json({ error: 'Invalid action' });
    } catch (err) {
        return res.status(500).json({
            error: 'Server error',
            details: err.message || JSON.stringify(err),
        });
    }
}