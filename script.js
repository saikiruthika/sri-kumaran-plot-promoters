const languageSelect = document.getElementById('languageSelect');
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en][data-ta]').forEach(el => {
    const value = el.dataset[lang];
    if (value !== undefined) el.innerHTML = value;
  });
  try { localStorage.setItem('skpp-language', lang); } catch(e) {}
}
languageSelect.addEventListener('change', e => setLanguage(e.target.value));
try {
  const saved = localStorage.getItem('skpp-language');
  if (saved === 'ta' || saved === 'en') languageSelect.value = saved;
} catch(e) {}
setLanguage(languageSelect.value);
document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

document.getElementById('enquiryForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get('name').trim();
  const phone = form.get('phone').trim();
  const propertyType = form.get('propertyType');
  const message = form.get('message').trim();
  const lang = languageSelect.value;
  const text = lang === 'ta'
    ? `வணக்கம் ஸ்ரீ குமரன் பிளாட் புரமோட்டர்ஸ்,\nபெயர்: ${name}\nதொலைபேசி: ${phone}\nசொத்து வகை: ${propertyType}\nதேவை: ${message || 'மேலும் விவரங்கள் தேவை'}`
    : `Hello Sri Kumaran Plot Promoters,\nName: ${name}\nPhone: ${phone}\nProperty type: ${propertyType}\nRequirements: ${message || 'Please share more details.'}`;
  window.open(`https://wa.me/919843045031?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
