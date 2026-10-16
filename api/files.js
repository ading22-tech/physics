import { list } from '@vercel/blob';
import { slug } from './_util.js';

export default async function handler(req, res) {
  const topic = slug(req.query.topic || '');
  if (!topic) return res.status(400).json({ error: 'Missing topic.' });
  try {
    const { blobs } = await list({ prefix: `files/${topic}/` });
    const files = blobs.map(b => ({ name: b.pathname.split('/').pop(), url: b.url, size: b.size }));
    res.setHeader('Cache-Control', 'no-store');
    res.json({ files });
  } catch (e) {
    res.status(500).json({ error: 'Could not list files.' });
  }
}
