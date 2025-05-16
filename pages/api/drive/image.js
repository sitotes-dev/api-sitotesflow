import { google } from 'googleapis';
import { credsGoogle } from '@/lib/cred-ential';


const creds = credsGoogle()

const auth = new google.auth.GoogleAuth({
  creds, // ini sama seperti menuliskan credentials: { client_email, private_key }
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

export default async function handler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'File ID is required' });
  }

  try {
    // Get file metadata to check if it's an image
    const { data: file } = await drive.files.get({
      fileId: id,
      fields: 'mimeType',
    });

    if (!file.mimeType.startsWith('image/')) {
      return res.status(400).json({ error: 'File is not an image' });
    }

    // Get the file content
    const response = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'stream' }
    );

    // Set proper content type
    res.setHeader('Content-Type', file.mimeType);
    
    // Pipe the data to response
    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
}