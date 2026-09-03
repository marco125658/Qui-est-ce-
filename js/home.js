/**
 * home.js — animation d'entrée de la page d'accueil.
 * Ne gère rien d'autre : la navigation vers game.html se fait
 * par un lien HTML classique (robuste, accessible, fonctionne sans JS).
 */

(function () {
    const REVEAL_STAGGER_MS = 150;

    document.addEventListener("DOMContentLoaded", function () {
        const revealItems = document.querySelectorAll(".reveal");

        revealItems.forEach(function (el, index) {
            setTimeout(function () {
                el.classList.add("reveal--active");
            }, index * REVEAL_STAGGER_MS);
        });
    });
})();
