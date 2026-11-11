/**
 * anniversaire.js — pop-up d'anniversaire sur l'accueil.
 * Le pop-up ne se ferme qu'à la fin de la musique (une seule lecture).
 * Réglage : MUSIC_START = seconde de départ de la musique.
 * La musique se lance toute seule ; si le navigateur la bloque (smartphone),
 * un bouton apparaît et le premier toucher dans la page la démarre.
 * Si le fichier audio est introuvable, le pop-up se ferme pour ne pas bloquer le jeu.
 */

(function () {
    const MUSIC_START = 10;
    const PHOTO_INTERVAL = 2750;
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
    const musicBtn = document.getElementById("btn-music");
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
            musicBtn.hidden = true;
            document.removeEventListener("pointerdown", startMusic);
        }).catch(function () {
            musicBtn.hidden = false;
        });
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
        Confetti.start();
        audioEl.addEventListener("loadedmetadata", seekToStart);
        audioEl.addEventListener("ended", closePopup);
        audioEl.addEventListener("error", closePopup);
        musicBtn.addEventListener("click", startMusic);
        document.addEventListener("pointerdown", startMusic);
        startMusic();
    });
})();
