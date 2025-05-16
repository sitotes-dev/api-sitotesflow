import fs from 'fs';
import path from 'path';

const dbPath = '/tmp/db.json';

export function readDB() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

export function writeDB(data: object) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}
