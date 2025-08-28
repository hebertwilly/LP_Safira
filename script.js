(function () {
      const btns = document.querySelectorAll('#energia-tabs .tab-btn, .tab-btn'); // fallback
      const panels = document.querySelectorAll('.tab-panel');
      const title = document.getElementById('tab-title');

      const titles = {
        s1: 'Diagnóstico e Limpeza Energética',
        s2: 'Ativação e Programação',
        s3: 'Manifestação e Ancoragem'
      };

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
    })();


const elementos = document.querySelectorAll('.refresh-animate');
  function animarElementos() {
    elementos.forEach(elemento => {
      // Adiciona a classe de animação
      elemento.classList.add('animar');
    });
  }
window.addEventListener('load', animarElementos);

document.addEventListener('DOMContentLoaded', () => {
  const REDIRECT_URL = './planos.html';
  const iframe  = document.getElementById('vimeo-player');
  const overlay = document.getElementById('vimeo-unmute');
  const btnSom = document.getElementById('btn-som');

  btnSom.addEventListener('click', () => {
    // Alterna ícones
    btnSom.classList.toggle('hidden');
  });

  if (!iframe) return;
  const player = new Vimeo.Player(iframe);

  // Autoplay mudo
  player.ready().then(() => {
    player.setMuted(true).catch(()=>{});
    player.play().catch(()=>{});
  });

  // Travar pausa/seek (opcional)
  let last = 0;
  player.on('timeupdate', ({ seconds }) => { if (seconds > last) last = seconds; });
  player.on('pause', () => player.play().catch(()=>{}));
  player.on('seeked', ({ seconds }) => {
    if (seconds > last + 0.6 || seconds < last - 1) player.setCurrentTime(last).catch(()=>{});
  });

  // Redirecionar ao terminar (opcional)
  player.on('ended', () => { window.location.href = REDIRECT_URL; });

  // Clique para ativar som
  if (overlay) {
    overlay.addEventListener('click', async () => {
      btnSom.classList.toggle('hidden');
      try {
        await player.setMuted(false);
        await player.setVolume(1);
        await player.play();
      } catch(e) {
        // se falhar, tenta ao menos dar play
        player.play().catch(()=>{});
      }
      // some e só volta no reload
      overlay.style.display = 'none';
    }, { once: true });
  }
});


