import { google } from 'googleapis';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { credsGoogle } from '@/lib/cred-ential';


const creds = credsGoogle()
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method tidak diizinkan' });

  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'ID tidak valid' });

  const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: creds.client_email,
        private_key: creds.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const drive = google.drive({ version: 'v3', auth });

  try {
    await drive.files.delete({ fileId: id });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Gagal menghapus file' });
  }
}