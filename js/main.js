
const root = document.documentElement;
const mode = localStorage.getItem('mode');
if (mode === 'dark') root.classList.add('dark');
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('mode-toggle');
  if (btn) btn.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('mode', root.classList.contains('dark') ? 'dark' : 'light');
  });
});
