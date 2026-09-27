/* Modalità scura
   - Cliccando l'asterisco (o un elemento con data-cambia-tema) il sito passa da chiaro a scuro e viceversa.
     La scelta NON viene ricordata: a ogni refresh il sito riparte chiaro.
   La modalità scura si attiva solo da qui. */
(function () {
  var root = document.documentElement;
  var bottoni = document.querySelectorAll("[data-cambia-tema]");
  var giro = 0;

  // Pulizia: toglie un eventuale tema colore salvato dalle versioni precedenti del sito
  root.removeAttribute("data-tema");
  try { localStorage.removeItem("tema"); } catch (err) {}

  function aggiornaEtichette() {
    var scuro = root.classList.contains("scuro");
    bottoni.forEach(function (b) {
      b.setAttribute("aria-pressed", scuro ? "true" : "false");
      b.setAttribute("aria-label", scuro ? "Passa alla modalità chiara" : "Passa alla modalità scura");
      var hint = b.querySelector(".tema-hint");
      if (hint) hint.textContent = scuro ? "Modalità chiara" : "Modalità scura";
    });
  }

  function cambia(e) {
    if (e) e.preventDefault();
    root.classList.toggle("scuro");
    aggiornaEtichette();

    // Mezzo giro a ogni clic
    giro += 180;
    bottoni.forEach(function (b) {
      b.style.setProperty("--giro", giro + "deg");
    });
  }

  bottoni.forEach(function (b) {
    b.addEventListener("click", cambia);
    // Tastiera: i <button> la gestiscono da soli, serve solo per gli altri elementi
    if (b.tagName !== "BUTTON") {
      b.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") cambia(e);
      });
    }
  });
  aggiornaEtichette();

  // Etichetta sull'asterisco solo alla prima visita, per 4 secondi
  try {
    if (!localStorage.getItem("hint-tema-visto")) {
      var icona = document.getElementById("rotating-icon");
      if (icona) {
        setTimeout(function () { icona.classList.add("mostra-hint"); }, 1500);
        setTimeout(function () { icona.classList.remove("mostra-hint"); }, 5500);
      }
      localStorage.setItem("hint-tema-visto", "1");
    }
  } catch (err) {}

})();