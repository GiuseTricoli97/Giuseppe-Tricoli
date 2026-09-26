/* Simboli di codice che escono da "web developer" al passaggio del mouse */
(function () {
  var parola = document.querySelector(".code-burst");
  if (!parola) return;

  // Niente effetto per chi ha disattivato le animazioni nel sistema
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var simboli = ["</>", "{ }", "( )", "[ ]", ";", "=>", "#", "$", "&&", "//", "::", "*", "0", "1"];
  var inCorso = false;

  function casuale(min, max) {
    return Math.random() * (max - min) + min;
  }

  function lancia() {
    if (inCorso) return;   // evita raffiche se il mouse entra ed esce di continuo
    inCorso = true;

    for (var i = 0; i < 10; i++) {
      var s = document.createElement("span");
      s.className = "simbolo";
      s.setAttribute("aria-hidden", "true");
      s.textContent = simboli[Math.floor(Math.random() * simboli.length)];

      s.style.left = casuale(5, 95) + "%";
      s.style.fontSize = casuale(0.3, 0.55) + "em";
      s.style.animationDelay = casuale(0, 0.15) + "s";
      s.style.setProperty("--dx", casuale(-130, 130) + "px");
      s.style.setProperty("--dy", -casuale(80, 220) + "px");
      s.style.setProperty("--r", casuale(-35, 35) + "deg");

      s.addEventListener("animationend", function () { this.remove(); });
      parola.appendChild(s);
    }

    setTimeout(function () { inCorso = false; }, 700);
  }

  parola.addEventListener("mouseenter", lancia);
  parola.addEventListener("touchstart", lancia, { passive: true });
})();