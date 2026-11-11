/**
 * anniversaire.js — pop-up d'anniversaire sur l'accueil.
 * Le pop-up ne se ferme qu'à la fin de la musique (une seule lecture).
 * Réglage : MUSIC_START = seconde de départ de la musique.
 * La musique se lance toute seule ; si le navigateur la bloque (smartphone),
 * le premier toucher dans la page la démarre (aucun bouton affiché).
 * Si le fichier audio est introuvable, le pop-up se ferme pour ne pas bloquer le jeu.
 */

(function () {
    const MUSIC_START = 10;
    const PHOTO_INTERVAL = 2750;
    const NOTE_COUNT = 14;
    const PHOTOS = [
        "assets/anniversaire/photo.jpg",
        "assets/anniversaire/photo2.png",
        "assets/anniversaire/photo3.webp",
        "assets/anniversaire/photo4.jpg"
    ];

    const photoEl = document.querySelector(".birthday-photo");
    let photoTimer = null;
    let photoIndex = 0;

    const popupEl = document.getElementById("birthday-popup");
    const audioEl = document.getElementById("birthday-audio");
    let hasSeeked = false;

    function seekToStart() {
        if (hasSeeked || audioEl.readyState < 1) return;
        audioEl.currentTime = MUSIC_START;
        hasSeeked = true;
    }

    function startMusic() {
        seekToStart();
        const playPromise = audioEl.play();
        if (!playPromise || typeof playPromise.then !== "function") return;

        playPromise.then(function () {
            document.removeEventListener("pointerdown", startMusic);
        }).catch(function () {
            /* autoplay bloqué : le premier toucher dans la page lancera la musique */
        });
    }

    function createNotes() {
        const symbols = ["♪", "♫", "♩", "♬"];
        const colors = ["#FF1717", "#38B6FF", "#FFFFFF", "#FFD400"];
        for (let i = 0; i < NOTE_COUNT; i++) {
            const note = document.createElement("span");
            note.className = "music-note";
            note.setAttribute("aria-hidden", "true");
            note.textContent = symbols[i % symbols.length];
            note.style.left = Math.round(Math.random() * 95) + "%";
            note.style.fontSize = (24 + Math.random() * 36) + "px";
            note.style.color = colors[i % colors.length];
            note.style.animationDuration = (6 + Math.random() * 6) + "s";
            note.style.animationDelay = (-Math.random() * 12) + "s";
            popupEl.appendChild(note);
        }
    }

    function closePopup() {
        clearInterval(photoTimer);
        Confetti.stop();
        document.removeEventListener("pointerdown", startMusic);
        popupEl.hidden = true;
    }

    function startPhotoCycle() {
        PHOTOS.forEach(function (src) {
            new Image().src = src;
        });
        photoTimer = setInterval(function () {
            photoIndex = (photoIndex + 1) % PHOTOS.length;
            photoEl.src = PHOTOS[photoIndex];
        }, PHOTO_INTERVAL);
    }

    document.addEventListener("DOMContentLoaded", function () {
        startPhotoCycle();
        createNotes();
        Confetti.start();
        audioEl.addEventListener("loadedmetadata", seekToStart);
        audioEl.addEventListener("ended", closePopup);
        audioEl.addEventListener("error", closePopup);
        document.addEventListener("pointerdown", startMusic);
        startMusic();
    });
})();
