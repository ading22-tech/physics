import { isAdmin } from './_util.js';

export default function handler(req, res) {
  if (!process.env.ADMIN_PASSWORD) return res.status(500).json({ error: 'ADMIN_PASSWORD is not set in Vercel.' });
  if (!isAdmin(req)) return res.status(401).json({ error: 'Wrong password.' });
  res.json({ ok: true });
}
