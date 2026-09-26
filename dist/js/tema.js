/* Cambio colori del sito.
   Ogni elemento con l'attributo data-cambia-tema passa al tema successivo.
   Il tema scelto viene ricordato tra una pagina e l'altra. */
(function () {
  var temi = {
    base:   "#69b4c2",
    carta:  "#f0b429",
    rosa:   "#f28b9b",
    salvia: "#9fcc5a",
    lilla:  "#a99bf0"
  };
  var nomi = Object.keys(temi);
  var root = document.documentElement;
  var bottoni = document.querySelectorAll("[data-cambia-tema]");
  var giro = 0;

  function attuale() {
    var t = root.getAttribute("data-tema");
    return nomi.indexOf(t) === -1 ? "base" : t;
  }

  function prossimo() {
    return nomi[(nomi.indexOf(attuale()) + 1) % nomi.length];
  }

  // Colora il cerchio dietro l'asterisco con l'accento del tema successivo
  function aggiornaAnteprima() {
    bottoni.forEach(function (b) {
      b.style.setProperty("--prossimo", temi[prossimo()]);
    });
  }

  function cambia(e) {
    if (e) e.preventDefault();
    var t = prossimo();
    root.setAttribute("data-tema", t);
    try { localStorage.setItem("tema", t); } catch (err) {}
    aggiornaAnteprima();

    // Rotazione di due punte a ogni clic
    giro += 144;
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
  aggiornaAnteprima();

  // Etichetta "Cambia colori" solo alla prima visita, per 4 secondi
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