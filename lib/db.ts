import fs from 'fs';
import path from 'path';

const sourcePath = path.join(process.cwd(), 'db.json'); // File asli (read-only)
const dbPath = '/tmp/db.json'; // File bisa ditulis

// Salin file dari read-only ke tmp jika belum ada
if (!fs.existsSync(dbPath)) {
  fs.copyFileSync(sourcePath, dbPath);
}

export function readDB() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

export function writeDB(data: object) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}
