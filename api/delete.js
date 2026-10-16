import { del } from '@vercel/blob';
import { isAdmin } from './_util.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });
  if (!isAdmin(req)) return res.status(401).json({ error: 'Wrong password.' });
  const url = req.body && req.body.url;
  let ok = false;
  try { const u = new URL(url); ok = u.hostname.endsWith('.blob.vercel-storage.com') && u.pathname.startsWith('/files/'); } catch (e) {}
  if (!ok) return res.status(400).json({ error: 'Bad file link.' });
  try { await del(url); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ error: 'Delete failed.' }); }
}
