// 生成式 AI 小白筆記：讀取 notes/index.json 建立側欄，再依網址 #weekXX 載入對應的 Markdown
const listEl = document.getElementById('week-list');
const contentEl = document.getElementById('content');

let notes = [];

// 數學式先換成佔位符，避免被 Markdown 解析弄壞；行內程式碼裡的 $ 不處理
function protectMath(md) {
  const maths = [];
  const text = md.replace(/(`[^`\n]*`)|(\$\$[\s\S]+?\$\$)|(\$[^$\n]+?\$)/g, (m, code) => {
    if (code) return code;
    maths.push(m);
    return `@@MATH${maths.length - 1}@@`;
  });
  return { text, maths };
}

function restoreMath(html, maths) {
  return html.replace(/@@MATH(\d+)@@/g, (_, i) =>
    maths[i].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
}

function renderList(activeId) {
  listEl.innerHTML = notes.map(n => `
    <li>
      <a href="#${n.id}" class="${n.id === activeId ? 'active' : ''}">
        <span class="week-no">W${String(n.week).padStart(2, '0')}</span>
        <span class="week-title">${n.title}</span>
      </a>
    </li>`).join('');
}

function renderHome() {
  contentEl.innerHTML = `
    <h1>生成式 AI 小白筆記</h1>
    <p class="lead">TAICA「生成式 AI：文字與圖像生成的原理與實務」（115-1）的每週重點整理，用白話寫給和我一樣的初學者。</p>
    <div class="cards">
      ${notes.map(n => `
        <a class="card" href="#${n.id}">
          <span class="week-no">第 ${n.week} 週</span>
          <strong>${n.title}</strong>
          <span>${n.summary}</span>
        </a>`).join('')}
    </div>`;
}

async function renderNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) { renderHome(); return; }
  contentEl.innerHTML = '<p class="loading">載入中…</p>';
  try {
    const res = await fetch(`notes/${note.file}`);
    if (!res.ok) throw new Error(res.status);
    const { text, maths } = protectMath(await res.text());
    contentEl.innerHTML = restoreMath(marked.parse(text), maths);
    // 外部連結開新分頁
    contentEl.querySelectorAll('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
    if (window.renderMathInElement) {
      renderMathInElement(contentEl, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        ignoredTags: ['code', 'pre'],
        throwOnError: false
      });
    }
  } catch (e) {
    contentEl.innerHTML = `<p class="loading">找不到筆記檔 notes/${note.file}（${e.message}）</p>`;
  }
  window.scrollTo(0, 0);
}

function route() {
  const id = location.hash.slice(1);
  renderList(id);
  if (id) renderNote(id); else renderHome();
}

marked.use({ gfm: true });

fetch('notes/index.json')
  .then(r => r.json())
  .then(data => {
    notes = data.sort((a, b) => a.week - b.week);
    window.addEventListener('hashchange', route);
    route();
  })
  .catch(() => { contentEl.innerHTML = '<p class="loading">讀不到 notes/index.json。本機預覽請用本機伺服器開啟，不要直接雙擊 index.html。</p>'; });
