const $ = s => document.querySelector(s);
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const show = id => { document.querySelectorAll('.view').forEach(v => v.hidden = v.id !== id); window.scrollTo(0, 0); };
let S = null, T = null;

function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
const lessonOf = t => (typeof MODULES !== 'undefined' && MODULES[t.name]) || [];

function renderTopics() {
  const box = $('#topics');
  TOPICS.forEach(t => {
    const b = el('button', 'topic');
    b.append(el('div', '', t.name), el('span', '', lessonOf(t).length + ' lessons · ' + t.questions.length + ' questions'));
    b.onclick = () => openTopic(t);
    box.appendChild(b);
  });
}

function openTopic(t) {
  T = t;
  $('#topic-name').textContent = t.name;
  const n = lessonOf(t).length;
  $('#module-meta').textContent = n ? n + ' lessons' : 'coming soon';
  $('#quiz-meta').textContent = t.questions.length + ' questions';
  show('topic');
}

function openModule() {
  $('#module-title').textContent = T.name;
  const box = $('#lesson');
  box.innerHTML = '';
  const lessons = lessonOf(T);
  if (!lessons.length) box.appendChild(el('p', 'empty', 'No module for this topic yet. Add one in modules.js.'));
  lessons.forEach(l => {
    const s = el('div', 'section');
    s.appendChild(el('h3', '', l.h));
    if (l.p) s.appendChild(el('p', '', l.p));
    if (l.formula) s.appendChild(el('div', 'formula', l.formula));
    if (l.example) {
      const ex = el('div', 'example');
      const q = el('p'); q.append(el('b', '', 'Example: '), document.createTextNode(l.example.q));
      const a = el('p'); a.append(el('b', '', 'Solution: '), document.createTextNode(l.example.a));
      ex.append(q, a);
      s.appendChild(ex);
    }
    box.appendChild(s);
  });
  loadFiles(box, T);
  show('module');
}

function start(questions) {
  S = { qs: shuffle(questions), i: 0, score: 0, missed: [] };
  show('quiz');
  ask();
}

function ask() {
  const q = S.qs[S.i];
  $('#count').textContent = `Question ${S.i + 1} of ${S.qs.length}`;
  $('#fill').style.width = (S.i / S.qs.length * 100) + '%';
  $('#question').textContent = q.q;
  $('#feedback').hidden = true;
  $('#next').hidden = true;
  const box = $('#options');
  box.innerHTML = '';
  shuffle(q.options.map((text, idx) => ({ text, idx }))).forEach(o => {
    const b = el('button', '', o.text);
    b.onclick = () => answer(b, o.idx === q.answer, q);
    b.dataset.correct = o.idx === q.answer;
    box.appendChild(b);
  });
}

function answer(btn, ok, q) {
  document.querySelectorAll('#options button').forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === 'true') b.classList.add('correct');
  });
  if (ok) S.score++; else { btn.classList.add('wrong'); S.missed.push(q); }
  const f = $('#feedback');
  f.className = 'feedback' + (ok ? '' : ' bad');
  f.innerHTML = '';
  f.append(el('b', '', ok ? 'Correct' : 'Not quite'), el('span', '', q.explain));
  f.hidden = false;
  const n = $('#next');
  n.textContent = S.i + 1 < S.qs.length ? 'Next question' : 'See results';
  n.hidden = false;
  n.focus();
}

function finish() {
  show('result');
  const total = S.qs.length, pct = Math.round(S.score / total * 100);
  $('#score').textContent = `You got ${S.score} of ${total} (${pct}%)`;
  $('#verdict').textContent = pct === 100 ? 'Perfect score. Try another topic.' :
    pct >= 70 ? 'Solid. Review the ones you missed below.' : 'Keep going. Re-read the module, then retry the missed ones.';
  const m = $('#missed');
  m.innerHTML = '';
  S.missed.forEach(q => {
    const d = el('div', 'miss');
    const p = el('p'); p.appendChild(el('b', '', q.q));
    d.append(p, el('p', '', 'Answer: ' + q.options[q.answer]), el('p', '', q.explain));
    m.appendChild(d);
  });
  $('#retry-missed').hidden = !S.missed.length;
}

$('#open-module').onclick = openModule;
$('#open-quiz').onclick = () => start(T.questions);
$('#module-quiz').onclick = () => start(T.questions);
$('#topic-back').onclick = () => show('home');
$('#module-back').onclick = () => show('topic');
$('#next').onclick = () => { S.i++; S.i < S.qs.length ? ask() : finish(); };
$('#quit').onclick = () => show('topic');
$('#home-btn').onclick = () => show('topic');
$('#again').onclick = () => start(T.questions);
$('#retry-missed').onclick = () => start(S.missed);
renderTopics();

const fmtSize = n => n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB';
async function loadFiles(box, topic) {
  try {
    const r = await fetch('/api/files?topic=' + encodeURIComponent(topic.name));
    if (!r.ok || T !== topic) return;
    const { files } = await r.json();
    if (!files.length) return;
    const s = el('div', 'section');
    s.appendChild(el('h3', '', 'Downloads'));
    files.forEach(f => {
      const a = el('a', 'file', f.name + ' (' + fmtSize(f.size) + ')');
      a.href = f.url; a.target = '_blank'; a.rel = 'noopener';
      const p = el('p'); p.appendChild(a); s.appendChild(p);
    });
    box.appendChild(s);
  } catch (e) { /* no files available (for example when opened offline) */ }
}
