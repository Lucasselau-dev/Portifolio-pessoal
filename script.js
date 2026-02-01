// ===============================
// DIGITAÇÃO SOBRE MIM
// ===============================
const text = `Sou estudante de Análise e Desenvolvimento de Software, com foco em
Programação Orientada a Objetos, banco de dados e qualidade de software.
Possuo perfil analítico, facilidade para aprender na prática e interesse
em evoluir tecnicamente e profissionalmente na área de TI.`;

const typedText = document.getElementById('typed-text');
let index = 0;

function type() {
    if(index < text.length){
        typedText.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 30);
    }
}

type();

// ===============================
// MODAL DE CERTIFICADOS
// ===============================
const buttons = document.querySelectorAll(".cert-btn");
const modal = document.getElementById("modal-certificado");
const modalImg = document.getElementById("img-modal");
const fechar = document.querySelector(".fechar");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        modalImg.src = btn.dataset.img;
        modal.classList.add("show");
        const resumoP = btn.nextElementSibling;
        resumoP.innerHTML = btn.dataset.resumo;
    });
});

fechar.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => { 
    if(e.target === modal) modal.classList.remove("show"); 
});
document.addEventListener("keydown", e => { 
    if(e.key === "Escape") modal.classList.remove("show"); 
});

// ===============================
// FADE-IN DAS SEÇÕES
// ===============================
const sections = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// ===============================
// BOTÃO VOLTAR AO TOPO
// ===============================
const topBtn = document.getElementById("topBtn");
window.onscroll = () => {
    if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// ===============================
// DARK / LIGHT MODE
// ===============================
const themeToggle = document.getElementById('themeToggle');
themeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
};

// ===============================
// API DE CLIMA + HORA
// ===============================
const climaHora = document.getElementById("climaHora");
const apiKey = "4b8427e24a2e0c8c354be8eea7629f27"; // SUA KEY

async function buscarClima() {
    try {
        const cidade = "Curitiba"; // pode alterar
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        const temperatura = Math.round(dados.main.temp);
        const descricao = dados.weather[0].description;

        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, "0");
        const minutos = agora.getMinutes().toString().padStart(2, "0");

        climaHora.innerHTML = `
             ${temperatura}°C - ${descricao.charAt(0).toUpperCase() + descricao.slice(1)}<br>
             ${horas}:${minutos}
        `;
    } catch(err) {
        console.error(err);
        climaHora.innerHTML = "Erro ao carregar clima/hora.";
    }
}

// Atualiza na hora
buscarClima();
setInterval(buscarClima, 60000);
