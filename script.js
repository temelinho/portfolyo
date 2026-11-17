// Mobil menü
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
}

// Arşiv sekmeleri + yıl seçici
const tabs = document.getElementById('tabs');
const yearbar = document.getElementById('yearbar');
if (tabs) {
  const buttons = tabs.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');

  function buildYears(panel) {
    if (!yearbar) return;
    const groups = [...panel.querySelectorAll('.year-group')];
    const years = [...new Set(groups.map(g => g.dataset.year))].sort((a, b) => b - a);
    yearbar.innerHTML = '';
    const mk = (label, val) => {
      const b = document.createElement('button');
      b.className = 'ybtn';
      b.textContent = label;
      b.dataset.year = val;
      return b;
    };
    yearbar.style.display = 'flex';
    const all = mk('Tümü', 'all');
    all.classList.add('active');
    yearbar.appendChild(all);
    years.forEach(y => yearbar.appendChild(mk(y, y)));
    yearbar.querySelectorAll('.ybtn').forEach(b => {
      b.addEventListener('click', () => {
        yearbar.querySelectorAll('.ybtn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        groups.forEach(g => {
          g.style.display = (b.dataset.year === 'all' || g.dataset.year === b.dataset.year) ? '' : 'none';
        });
      });
    });
    groups.forEach(g => { g.style.display = ''; });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(btn.dataset.panel);
      panel.classList.add('active');
      buildYears(panel);
    });
  });

  // İlk aktif panel için yıl çubuğunu kur
  const first = document.querySelector('.panel.active');
  if (first) buildYears(first);
}

// Ana sayfada aktif bölümü menüde vurgula
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
if (navLinks.length) {
  const sections = [...navLinks].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => obs.observe(s));
}
