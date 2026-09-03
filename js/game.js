/**
 * game.js — page de choix de l'univers.
 * Enregistre l'univers choisi dans localStorage puis redirige vers roulette.html.
 */

(function () {
    const STORAGE_KEY = "qec_selectedUniverse";

    document.addEventListener("DOMContentLoaded", function () {
        const cards = document.querySelectorAll(".universe-card");

        cards.forEach(function (card) {
            card.addEventListener("click", function () {
                const universeKey = card.getAttribute("data-universe");
                try {
                    localStorage.setItem(STORAGE_KEY, universeKey);
                } catch (e) {
                    /* localStorage indisponible : on continue quand même */
                }
                window.location.href = "roulette.html";
            });
        });
    });
})();
