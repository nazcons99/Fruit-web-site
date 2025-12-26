const input = document.getElementById('search');
const button = document.getElementById('foundb');
const boxes = document.querySelectorAll('.fructbox');

function filterFruits() {
  let q = (input.value || '').trim().toLowerCase();

  // Простая замена синонимов (если пользователь ввёл 'яблоко', найдём 'Алма' и т.д.)
  const synonyms = { 'яблоко': 'алма', 'кокос': 'какос' };
  Object.keys(synonyms).forEach(k => { if (q.includes(k)) q = q.replace(k, synonyms[k]); });

  // If query is empty, show all fruits
  if (!q) {
    boxes.forEach(b => b.style.display = '');
    return;
  }
  

  // Otherwise show only matching fruits (search in name, description, img alt)
  boxes.forEach(b => {
    const name = (b.querySelector('.fruit-name')?.textContent || '').toLowerCase();
    const desc = (b.querySelector('.fruit-description')?.textContent || '').toLowerCase();
    const alt = (b.querySelector('img')?.alt || '').toLowerCase();
    const match = name.includes(q) || desc.includes(q) || alt.includes(q);
    b.style.display = match ? '' : 'none';
  });
}

button.addEventListener('click', filterFruits);
input.addEventListener('keyup', (e) => { if (e.key === 'Enter') filterFruits(); });
input.addEventListener('input', () => { if (!input.value.trim()) boxes.forEach(b => b.style.display = ''); });