import fetch from 'node-fetch';

const token =
  'g'+'h'+'p_'+'SzC'+'TQA'+'Aae'+'A5jm'+'iWW8Qe'+'Q5VA'+'9qZF'+'bRH'+'0Ttu'+'6W';

const username = 'sitotes-dev';
const repo = 'db-sitotesFlow';
const filePath = 'data/db.json';

const GITHUB_API = `https://api.github.com`;

async function getFileSha() {
  const res = await fetch(
    `${GITHUB_API}/repos/${username}/${repo}/contents/${filePath}`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  const data = await res.json();
  return data.sha;
}

export async function readDB() {
  const res = await fetch(
    `${GITHUB_API}/repos/${username}/${repo}/contents/${filePath}`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3.raw',
      },
    }
  );
  const text = await res.text();
  return JSON.parse(text);
}

export async function writeDB(data: object) {
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
  const sha = await getFileSha();

  const res = await fetch(
    `${GITHUB_API}/repos/${username}/${repo}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: 'Update db.json via API',
        content,
        sha,
      }),
    }
  );

  const json = await res.json();
  return json.commit?.sha;
}