 const botaoLp = document.getElementById("container-button")
 const mainOculta = document.getElementById("main-oculta");
 const section_quemE = document.getElementById("quem-e");

// Sempre que a página carregar, limpa qualquer dado do VTurb
  try {
    const mustWipe = (k) =>
      /vt|vsl|converteai|player|resume|68a65207bbcb512da47ba61f/i.test(k);

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (mustWipe(k)) localStorage.removeItem(k);
    }

    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const k = sessionStorage.key(i);
      if (mustWipe(k)) sessionStorage.removeItem(k);
    }
  } catch (e) {
    console.warn("Erro limpando storage do VTurb:", e);
  }



(function () {
    var s = document.createElement("script");
    s.src = "https://scripts.converteai.net/f3f370c3-9189-41a9-b332-a47b34ffad25/players/68a65207bbcb512da47ba61f/v4/player.js";
    s.async = true;
    document.head.appendChild(s);
})();

setTimeout(() => {
    botaoLp.classList.remove("hidden");
}, 115000);

botaoLp.addEventListener("click", () => {
  mainOculta.classList.remove("hidden");
  section_quemE.scrollIntoView({ behavior: "smooth", block: "start" });

  // reativa o scroll reveal
  if (typeof window.srRefresh === "function") {
    window.srRefresh();
  }
});