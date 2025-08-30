/* ====================================================
   Abas (Semanas)
   ==================================================== */
(function () {
  const btns   = document.querySelectorAll('#energia-tabs .tab-btn, .tab-btn'); // fallback
  const panels = document.querySelectorAll('.tab-panel');
  const title  = document.getElementById('tab-title');

  const titles = {
    s1: 'Diagnóstico e Limpeza Energética',
    s2: 'Ativação e Programação',
    s3: 'Manifestação e Ancoragem'
  };

  if (btns.length) {
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-tab');
        // ativa botão
        btns.forEach(b => {
          if (b.getAttribute('data-tab') === id) {
            b.classList.remove('bg-white/5','text-white/70','ring-white/10');
            b.classList.add('bg-yellow-300','text-black','ring-violet-500/30');
          } else {
            b.classList.add('bg-white/5','text-white/70','ring-white/10');
            b.classList.remove('bg-yellow-300','text-black','ring-violet-500/30');
          }
        });
        // troca painel
        panels.forEach(p => p.classList.toggle('hidden', p.getAttribute('data-panel') !== id));
        // troca título
        if (title) title.textContent = titles[id] || '';
      });
    });
  }
})();

/* ====================================================
   Animações de entrada simples
   ==================================================== */
(function(){
  const elementos = document.querySelectorAll('.refresh-animate');
  function animarElementos() {
    elementos.forEach(el => el.classList.add('animar'));
  }
  window.addEventListener('load', animarElementos);
})();

// Configurações
  const REDIRECT_URL = 'planos.html';

  document.addEventListener('DOMContentLoaded', function () {
    // Instancia o player pelo container #meuPlayer (usa o data-vturb-id)
    const player = new VTurb.Player('meuPlayer');

    // Redireciona quando o vídeo terminar
    player.on('ended', function () {
      // Se quiser mostrar o aviso por 1s antes de ir, descomente as 3 linhas abaixo e comente a última
      // const hint = document.getElementById('redirect-hint');
      // if (hint) hint.classList.remove('hidden');
      // setTimeout(() => window.location.href = REDIRECT_URL, 1000);

      window.location.href = REDIRECT_URL;
    });
  });
/* ====================================================
   Carrossel manual simples (prev/next) — se existir
   ==================================================== */
(function(){
  const track = document.getElementById('skillsTrack');
  const prev  = document.getElementById('skillsPrev');
  const next  = document.getElementById('skillsNext');
  if (!track) return;

  function scrollByPage(dir=1){
    const amount = track.clientWidth * 0.9;
    track.scrollBy({ left: amount * dir, behavior:'smooth' });
  }
  prev?.addEventListener('click', ()=>scrollByPage(-1));
  next?.addEventListener('click', ()=>scrollByPage(1));
  track.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowRight') scrollByPage(1);
    if(e.key==='ArrowLeft')  scrollByPage(-1);
  });
})();

/* ====================================================
   Scroll reveal com IntersectionObserver
   ==================================================== */
(function scrollReveal(){
  const selector = '.elemento, #skillsTrack .reveal';

  // estado inicial apenas para o que começa fora da viewport
  const prime = (el) => {
    const r = el.getBoundingClientRect();
    if (r.top >= window.innerHeight * 0.98) el.classList.add('sr-init');
  };

  const applyToNodeAndChildren = (node) => {
    if (node.nodeType !== 1) return;
    if (node.matches?.(selector)) { prime(node); io.observe(node); }
    node.querySelectorAll?.(selector).forEach(el => { prime(el); io.observe(el); });
  };

  const onEnter = (entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('sr-in');
    el.classList.remove('sr-init');
    io.unobserve(el);
  };

  const io = new IntersectionObserver((entries)=>entries.forEach(onEnter), {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px'
  });

  // aplica nos existentes
  document.querySelectorAll(selector).forEach(el => { prime(el); io.observe(el); });

  // observa grids que recebem itens dinamicamente
  ['#gridDev','#gridDesign'].forEach(sel=>{
    const node = document.querySelector(sel);
    if(!node) return;
    new MutationObserver((ms)=>{
      ms.forEach(m => m.addedNodes.forEach(applyToNodeAndChildren));
    }).observe(node, { childList:true, subtree:true });
  });

  // pós navegação por âncora / resize
  const revealNow = () => {
    document.querySelectorAll('.sr-init').forEach(el=>{
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.95) {
        el.classList.add('sr-in');
        el.classList.remove('sr-init');
      }
    });
  };
  window.addEventListener('hashchange', () => requestAnimationFrame(revealNow));
  window.addEventListener('load', revealNow, { once:true });
  window.addEventListener('orientationchange', () => setTimeout(revealNow, 200));
  let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(revealNow, 120); });
})();
