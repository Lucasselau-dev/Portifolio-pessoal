// ─── TYPEWRITER — SOBRE ─────────────────────────────
const sobreText = `Sou estudante de Análise e Desenvolvimento de Software, com foco no desenvolvimento de soluções em TI, banco de dados e qualidade de software. Possuo perfil analítico, facilidade para aprender na prática e interesse em evoluir tecnicamente e profissionalmente na área de TI.

Tenho boa organização, senso de responsabilidade, comunicação clara e facilidade para trabalhar em equipe, além de comprometimento com prazos e atenção aos detalhes. Disposição para contribuir, crescer junto com a empresa e vestir a camisa.`;

const typedEl = document.getElementById('typed-text');
let typedStarted = false;
let typedIdx = 0;

function runTypewriter() {
    if (typedStarted) return;
    typedStarted = true;
    function step() {
        if (typedIdx < sobreText.length) {
            typedEl.textContent += sobreText[typedIdx++];
            setTimeout(step, 20);
        }
    }
    step();
}

// ─── FADE-IN POR SCROLL ──────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');

const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        if (e.target.id === 'sobre') runTypewriter();
    });
}, { threshold: 0.12 });

fadeEls.forEach(el => revealObs.observe(el));

// ─── BACK TO TOP ─────────────────────────────────────
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 300);
}, { passive: true });

topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── DARK / LIGHT MODE ───────────────────────────────
const themeBtn = document.getElementById('themeToggle');

// Carregar preferência salva
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ─── MODAL DE CERTIFICADOS ───────────────────────────
const modal    = document.getElementById('modal-certificado');
const modalImg = document.getElementById('img-modal');
const fecharEl = document.querySelector('.fechar');

document.querySelectorAll('.cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        modalImg.src = btn.dataset.img;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

fecharEl.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── CLIMA + RELÓGIO ─────────────────────────────────
const climaTemp = document.querySelector('.clima-temp');
const climaDesc = document.querySelector('.clima-desc');
const climaTime = document.getElementById('relogio');
const API_KEY   = '4b8427e24a2e0c8c354be8eea7629f27';

function pad(n) { return String(n).padStart(2, '0'); }

function updateClock() {
    const d = new Date();
    climaTime.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function weatherEmoji(id) {
    if (id < 300) return '⛈';
    if (id < 500) return '🌦';
    if (id < 600) return '🌧';
    if (id < 700) return '❄️';
    if (id < 800) return '🌫';
    if (id === 800) return '☀️';
    return '⛅';
}

async function fetchWeather() {
    try {
        const r = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Curitiba&appid=${API_KEY}&units=metric&lang=pt_br`
        );
        const d = await r.json();
        const temp = Math.round(d.main.temp);
        const desc = d.weather[0].description;
        const icon = weatherEmoji(d.weather[0].id);

        climaTemp.textContent = `${icon} ${temp}°C`;
        climaDesc.textContent = desc;
    } catch {
        climaTemp.textContent = '—';
        climaDesc.textContent = 'Curitiba, PR';
    }
}

updateClock();
fetchWeather();
setInterval(updateClock, 30000);
setInterval(fetchWeather, 600000); // Re-fetch a cada 10 min

// ─── SMOOTH SCROLL (offset pelo menu fixo, se houver) ─
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
