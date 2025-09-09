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
   Scroll reveal com IntersectionObserver (versão com refresh)
   ==================================================== */
(function scrollReveal(){
  const selector = '.elemento, #skillsTrack .reveal';

  const prime = (el) => {
    const r = el.getBoundingClientRect();
    if (r.top >= window.innerHeight * 0.98) el.classList.add('sr-init');
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

  // função que aplica observer a todos os elementos alvo
  const bindAll = () => {
    document.querySelectorAll(selector).forEach(el => {
      prime(el);
      io.observe(el);
    });
  };

  const revealNow = () => {
    document.querySelectorAll('.sr-init').forEach(el=>{
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.95) {
        el.classList.add('sr-in');
        el.classList.remove('sr-init');
      }
    });
  };

  // aplica nos existentes
  bindAll();

  // expõe refresh público pra usar no timervsl.js
  window.srRefresh = () => { bindAll(); requestAnimationFrame(revealNow); };

  // observa grids dinâmicos
  ['#gridDev','#gridDesign'].forEach(sel=>{
    const node = document.querySelector(sel);
    if(!node) return;
    new MutationObserver((ms)=>{
      ms.forEach(m => m.addedNodes.forEach(node=>{
        if (node.nodeType !== 1) return;
        if (node.matches?.(selector)) { prime(node); io.observe(node); }
        node.querySelectorAll?.(selector).forEach(el => { prime(el); io.observe(el); });
      }));
    }).observe(node, { childList:true, subtree:true });
  });

  // pós navegação por âncora / resize
  window.addEventListener('hashchange', () => requestAnimationFrame(revealNow));
  window.addEventListener('load', revealNow, { once:true });
  window.addEventListener('orientationchange', () => setTimeout(revealNow, 200));
  let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(revealNow, 120); });
})();


document.addEventListener("DOMContentLoaded", () => {
  const msg = "Olá, vim pela pagina da vendas do método 5D que ativa\nsua energia milionária em 21 dias. Quero ativar minha energia milionária agora 💸";
  const url = "https://wa.me/351961602186?text=" + encodeURIComponent(msg);

  const wrap = document.createElement("div");
  wrap.className = "fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex items-center space-x-2";

  wrap.innerHTML = `
    <div class="relative group">
      <!-- Balão -->
      <div
        class="absolute right-full mr-3 bg-white text-gray-800 text-sm font-medium px-3 py-2 rounded-lg shadow-lg border opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
      >
        Fale conosco
        <!-- Setinha -->
        <div class="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white drop-shadow"></div>
      </div>

      <!-- Botão -->
      <a href="${url}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp"
         onclick="fbq('track', 'Lead')"
         class="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 active:scale-95 transition transform focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 group">
        <svg viewBox="0 0 32 32" class="w-7 h-7 md:w-8 md:h-8 fill-current" aria-hidden="true">
          <path d="M19.11 17.11c-.26-.13-1.53-.75-1.77-.84-.24-.09-.42-.13-.6.13-.18.26-.69.84-.84 1.02-.15.18-.31.2-.57.07-.26-.13-1.08-.4-2.06-1.28-.76-.68-1.27-1.52-1.42-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.29.4-.44.13-.15.18-.26.26-.44.09-.18.04-.33-.02-.46-.07-.13-.6-1.44-.82-1.97-.22-.53-.43-.46-.6-.46h-.51c-.18 0-.46.07-.7.33-.24.26-.93.91-.93 2.22s.95 2.58 1.08 2.76c.13.18 1.87 2.86 4.55 4 .64.28 1.14.45 1.52.58.64.2 1.22.17 1.68.1.51-.08 1.53-.63 1.75-1.24.22-.6.22-1.12.15-1.24-.07-.11-.24-.18-.49-.31zM16.03 3.2c-6.99 0-12.67 5.68-12.67 12.67 0 2.23.59 4.32 1.63 6.12L3.2 28.8l6.98-1.84c1.73.95 3.72 1.49 5.84 1.49 6.99 0 12.67-5.68 12.67-12.67S23.02 3.2 16.03 3.2zm0 22.97c-1.93 0-3.72-.56-5.23-1.53l-.37-.23-4.14 1.09 1.11-4.04-.24-.41a9.79 9.79 0 0 1-1.49-5.22c0-5.42 4.42-9.84 9.84-9.84s9.84 4.42 9.84 9.84-4.42 9.84-9.84 9.84z"/>
        </svg>
      </a>
    </div>
  `;

  document.body.appendChild(wrap);
});