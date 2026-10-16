import { put } from '@vercel/blob';
import { isAdmin, slug, cleanName, extOf, ALLOWED, MAX_BYTES } from './_util.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });
  if (!isAdmin(req)) return res.status(401).json({ error: 'Wrong password.' });

  const topic = slug(req.query.topic || '');
  const name = cleanName(req.query.name || '');
  if (!topic || !name) return res.status(400).json({ error: 'Missing topic or file name.' });
  if (!ALLOWED.includes(extOf(name))) return res.status(400).json({ error: 'File type not allowed. Use: ' + ALLOWED.join(', ') });

  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > MAX_BYTES) return res.status(413).json({ error: 'File is over 4 MB.' });
    chunks.push(c);
  }
  try {
    const blob = await put(`files/${topic}/${name}`, Buffer.concat(chunks), {
      access: 'public', addRandomSuffix: false, allowOverwrite: true
    });
    res.json({ url: blob.url });
  } catch (e) {
    res.status(500).json({ error: 'Upload failed. Is the Blob store connected to this project?' });
  }
}
