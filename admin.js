import { upload } from './blob-client.js';
const $ = s => document.querySelector(s);
let pw = '';
const say = (t, bad) => { const m = $('#msg'); m.textContent = t; m.className = bad ? 'err' : 'ok'; };
const api = (url, opts = {}) => fetch(url, { ...opts, headers: { ...(opts.headers || {}), 'x-admin-password': pw } });
const errOf = async r => { try { return (await r.json()).error; } catch (e) { return 'Error ' + r.status + (r.status === 413 ? ' (file too big)' : ''); } };
const kb = n => n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB';

TOPICS.forEach(t => { const o = document.createElement('option'); o.textContent = t.name; $('#topic').appendChild(o); });

async function refresh() {
  const box = $('#files');
  box.textContent = 'Loading...';
  const r = await fetch('/api/files?topic=' + encodeURIComponent($('#topic').value));
  box.innerHTML = '';
  if (!r.ok) { box.textContent = 'Could not load files.'; return; }
  const { files } = await r.json();
  if (!files.length) { box.textContent = 'No files yet.'; return; }
  files.forEach(f => {
    const row = document.createElement('div');
    row.className = 'filerow';
    const a = document.createElement('a');
    a.href = f.url; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = f.name + ' (' + kb(f.size) + ')';
    const d = document.createElement('button');
    d.textContent = 'Delete';
    d.onclick = async () => {
      if (!confirm('Delete ' + f.name + '?')) return;
      const x = await api('/api/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: f.url }) });
      if (x.ok) { say('Deleted.'); refresh(); } else say(await errOf(x), true);
    };
    row.append(a, d);
    box.appendChild(row);
  });
}

$('#unlock').onclick = async () => {
  pw = $('#pw').value;
  const r = await api('/api/login');
  if (!r.ok) { pw = ''; say(await errOf(r), true); return; }
  say('');
  $('#login').hidden = true; $('#panel').hidden = false;
  refresh();
};
$('#topic').onchange = refresh;
const MAX = 500 * 1024 * 1024;
const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const clean = n => n.replace(/[^\w.\- ]+/g, '_').replace(/^\.+/, '').slice(0, 100);
$('#upload').onclick = async () => {
  const f = $('#file').files[0];
  if (!f) { say('Choose a file first.', true); return; }
  if (f.size > MAX) { say('That file is over 500 MB.', true); return; }
  const btn = $('#upload');
  btn.disabled = true;
  say('Uploading... 0%');
  try {
    await upload('files/' + slug($('#topic').value) + '/' + clean(f.name), f, {
      access: 'public',
      handleUploadUrl: '/api/upload',
      headers: { 'x-admin-password': pw },
      multipart: f.size > 20 * 1024 * 1024,
      addRandomSuffix: false,
      allowOverwrite: true,
      onUploadProgress: p => say('Uploading... ' + Math.round(p.percentage) + '%')
    });
    say('Uploaded ' + f.name);
    $('#file').value = '';
    refresh();
  } catch (e) {
    say(e.message || 'Upload failed.', true);
  }
  btn.disabled = false;
};
