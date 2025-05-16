import type { NextApiRequest, NextApiResponse } from 'next'
import {
    google
} from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';
import { credsGoogle } from '@/lib/cred-ential';


const creds = credsGoogle()

export const config = {
    api: {
        bodyParser: false,
    },
};

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: creds.client_email,
    private_key: creds.private_key,
  },
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
    version: 'v3',
    auth
});
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Fix CORS res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const form = formidable({
            multiples: false
        });

        form.parse(req, async (err, fields, files) => {
            if (err || !files.file) return res.status(400).json({
                error: 'Upload error'
            });

            const file = Array.isArray(files.file) ? files.file[0] : files.file;
            const customName = fields.customName?.[0];
            const autoReplace = fields.autoReplace?.[0] === 'true';
            const finalFileName = customName || file.originalFilename;

            try {
                if (autoReplace) {
                    const existing = await findDriveFileByName(finalFileName);
                    if (existing) {
                        await deleteFromDrive(existing.id);
                    }
                }

                const uploaded = await uploadToDrive(file.filepath, finalFileName);
                res.status(200).json({
                    success: true,
                    file: uploaded
                });
            } catch (e) {
                console.error(e);
                res.status(500).json({
                    error: 'Upload gagal'
                });
            }
        });

    } else if (req.method === 'GET') {
        try {
            const list = await listDriveFiles();
            res.status(200).json(list);
        } catch (e) {
            console.error(e);
            res.status(500).json({
                error: 'Gagal ambil file'
            });
        }
    } else {
        res.status(405).end();
    }
}

async function uploadToDrive(filepath: string, name: string) {
    const fileMetadata = {
        name,
        parents: ['1KxeCIBDCaiCxqbxNK2t_Q0jFf7l60Vlt']
    };
    const media = {
        mimeType: 'application/octet-stream',
        body: fs.createReadStream(filepath),
    };
    const res = await drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: 'id, name',
    });

    // SET FILE PUBLIC
    await drive.permissions.create({
        fileId: res.data.id,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        },
    });

    return res.data;
}

async function listDriveFiles() {
    const res = await drive.files.list({
        fields: 'files(id, name)',
        pageSize: 100,
    });
    return res.data.files || [];
}

async function findDriveFileByName(name: string) {
    const files = await listDriveFiles();
    return files.find((f) => f.name === name);
}

async function deleteFromDrive(id: string) {
    await drive.files.delete({
        fileId: id
    });
}