// script.js
// 负责：渲染、搜索、FLIP（仅 translateY）、显隐动画（不乱飞）
// 依赖 `softwareData` 在 data.js 中定义

const listEl = document.getElementById('softwareList');
const inputEl = document.getElementById('searchInput');
const btnEl = document.getElementById('searchBtn');
const noResultEl = document.getElementById('noResult');

// 1) 创建 DOM 元素（只做一次），并保留原始顺序数组
const ORIGINAL_ORDER = [];
function createCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.name = item.name;
  card.dataset.keywords = (item.keywords || []).join(' ');
  card.dataset.id = item.id || '';

  card.innerHTML = `
    <div class="left">
      <div class="icon"><img src="${item.icon}" alt="${item.name}" onerror="this.style.display='block'; this.style.width='36px'"/></div>
      <div class="meta">
        <div class="name">${item.name}</div>
        <div class="desc">${item.desc || ''}</div>
      </div>
    </div>
    <div class="right">
      <div class="small-muted">${item.size || '--'}</div>
      <a class="btn" href="${item.url}" target="_blank" rel="noopener noreferrer">下载</a>
    </div>
  `;

  return card;
}

function initialRender() {
  listEl.innerHTML = '';
  softwareData.forEach((it) => {
    const card = createCard(it);
    listEl.appendChild(card);
    ORIGINAL_ORDER.push(card);
  });
  // 确保所有卡片为 display:flex（CSS 是 block，但我们用 flex-like layout)
  ORIGINAL_ORDER.forEach(c => c.style.display = 'flex');
}
initialRender();


// 辅助：检测元素当前是否可见（display not none）
function isVisible(el){
  return window.getComputedStyle(el).display !== 'none';
}

// 主搜索函数（FLIP 仅 Y）
function runSearch() {
  const q = inputEl.value.trim().toLowerCase();

  // 当前所有元素引用（按 DOM 当前顺序）
  const all = Array.from(ORIGINAL_ORDER);

  // 记录哪些元素在搜索前是 visible（用于 firstRect）
  const visibleBefore = new Map();
  all.forEach(el => visibleBefore.set(el, isVisible(el)));

  // FIRST: 记录变更前 top（仅对 visibleBefore 的元素）
  const firstTop = new Map();
  all.forEach(el => {
    if (visibleBefore.get(el)) firstTop.set(el, el.getBoundingClientRect().top);
    else firstTop.set(el, null);
  });

  // 计算 matches / nonMatches（按 ORIGINAL_ORDER 保持稳定顺序）
  const matches = [];
  const nonMatches = [];
  ORIGINAL_ORDER.forEach(el => {
    const name = (el.dataset.name || '').toLowerCase();
    const kw = (el.dataset.keywords || '').toLowerCase();
    if (!q || name.includes(q) || kw.includes(q)) matches.push(el);
    else nonMatches.push(el);
  });

  // 为避免测量问题：把之前 display:none 的元素临时设为可见且收起（opacity 0 + maxHeight 0）
  const previouslyHidden = all.filter(el => !visibleBefore.get(el));
  previouslyHidden.forEach(el => {
    el.style.display = 'flex';       // 放回流中以便测量 lastTop
    el.style.opacity = '0';
    el.style.overflow = 'hidden';
    el.style.maxHeight = '0px';
  });

  // LAST: 重新排 DOM（matches 在前）
  const frag = document.createDocumentFragment();
  matches.forEach(el => frag.appendChild(el));
  nonMatches.forEach(el => frag.appendChild(el));
  listEl.appendChild(frag);

  // 记录变更后 top（此时所有元素至少 display:flex，能测量）
  const lastTop = new Map();
  all.forEach(el => lastTop.set(el, el.getBoundingClientRect().top));

  // FLIP: 设置反转位移（仅 Y）
  all.forEach(el => {
    const f = firstTop.get(el);
    const l = lastTop.get(el);
    let dy = 0;
    if (f !== null && l !== null) dy = f - l;
    else if (f === null && l !== null) {
      // 元素之前隐藏，现在显示：让它从下方轻微进入（10px）
      dy = 10;
    } else if (f !== null && l === null) {
      // 元素之前显示，现在被放在最后（但我们通常不会遇到 l===null，因为我们暂时把它显示）
      dy = f - (l || f);
    }

    // 直接设置反向位移
    el.style.transition = 'none';
    el.style.transform = `translateY(${dy}px)`;
    // ensure maxHeight presence for those that were visible (helps collapse animation)
    if (!el.style.maxHeight) {
      el.style.maxHeight = el.scrollHeight + 'px';
    }
  });

  // 强制重绘后播放动画到最终位置
  requestAnimationFrame(() => {
    all.forEach(el => {
      // 统一设置过渡（只 Y + opacity + max-height）
      el.style.transition = 'transform 380ms cubic-bezier(.2,.9,.3,1), opacity 320ms ease, max-height 360ms ease, margin 360ms ease';
      el.style.transform = 'translateY(0)';
    });

    // 非匹配项：渐隐 + 收起（结束后 display:none）
    nonMatches.forEach(el => {
      // 先确保可测量当前高度（如果之前被临时收起，则 scrollHeight 为实际高度）
      el.style.overflow = 'hidden';
      el.style.maxHeight = el.scrollHeight + 'px';
      // 触发下一帧收起
      requestAnimationFrame(() => {
        el.style.opacity = '0';
        el.style.maxHeight = '0px';
        el.style.marginTop = '0px';
        el.style.marginBottom = '0px';
      });

      // 清理：在 max-height 动画结束后真正隐藏并移除临时样式
      const onEnd = (ev) => {
        if (ev.propertyName === 'max-height') {
          el.style.display = 'none';
          // 清理样式，保留 dataset
          el.style.removeProperty('overflow');
          el.style.removeProperty('max-height');
          el.style.removeProperty('margin-top');
          el.style.removeProperty('margin-bottom');
          el.style.removeProperty('transform');
          el.style.removeProperty('transition');
          el.style.removeProperty('opacity');
          el.removeEventListener('transitionend', onEnd);
        }
      };
      el.addEventListener('transitionend', onEnd);
    });

    // 匹配项：确保显示并淡入（如果之前被临时设置为隐藏）
    matches.forEach(el => {
      el.style.display = 'flex';
      // 如果元素刚刚从隐藏状态被临时设置为 opacity 0 / maxHeight 0（previouslyHidden），让它展开
      if (parseFloat(getComputedStyle(el).opacity) === 0) {
        // 允许展开到自然高度
        const h = el.scrollHeight;
        el.style.maxHeight = h + 'px';
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.maxHeight = '';
        });
      } else {
        // 普通可见项：保证不透明
        el.style.opacity = '1';
        el.style.removeProperty('max-height');
      }

      // 清理 transitionend 后的临时 transform/transition 保持 DOM 清洁
      const clean = () => {
        el.style.removeProperty('transform');
        el.style.removeProperty('transition');
        el.removeEventListener('transitionend', clean);
      };
      el.addEventListener('transitionend', clean);
    });

    // 无结果提示
    noResultEl.style.display = matches.length ? 'none' : 'block';
  });
}

// 事件绑定（搜索按钮 + 回车）
btnEl.addEventListener('click', runSearch);
inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') runSearch(); });

// Optional reset API
window.resetSearch = function(){
  inputEl.value = '';
  runSearch();
};
