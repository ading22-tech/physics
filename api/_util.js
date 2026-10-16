import { createHash, timingSafeEqual } from 'node:crypto';

export const ALLOWED = ['pdf', 'docx', 'doc', 'pptx', 'ppt', 'xlsx', 'png', 'jpg', 'jpeg', 'txt'];
export const MAX_BYTES = 4 * 1024 * 1024; // Vercel functions accept about 4.5 MB per request

const hash = s => createHash('sha256').update(String(s)).digest();

export function isAdmin(req) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  return timingSafeEqual(hash(req.headers['x-admin-password'] || ''), hash(real));
}

export const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const cleanName = s => String(s).replace(/[^\w.\- ]+/g, '_').replace(/^\.+/, '').slice(0, 100);
export const extOf = n => (n.split('.').pop() || '').toLowerCase();
