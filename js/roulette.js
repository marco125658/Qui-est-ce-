/**
 * roulette.js — logique de la roulette.
 *
 * Réglages faciles à changer :
 *   ROULETTE_DURATION : durée totale d'une roulette (ms)
 *   SPIN_STEPS        : nombre d'images affichées pendant le défilement
 *   PRELOAD_TIMEOUT   : temps max d'attente du préchargement des photos (ms)
 */

(function () {
    const STORAGE_KEY = "qec_selectedUniverse";
    const ROULETTE_DURATION = 2000;
    const SPIN_STEPS = 20;
    const PRELOAD_TIMEOUT = 2500;

    let universeData = null;
    let lastCharacterId = null;
    let isSpinning = false;

    const universeNameEl = document.getElementById("universe-name");
    const photoWrapEl = document.getElementById("photo-wrap");
    const photoEl = document.getElementById("reel-photo");
    const nameEl = document.getElementById("reel-name");
    const resultBannerEl = document.getElementById("result-banner");
    const launchBtn = document.getElementById("btn-launch");
    const replayBtn = document.getElementById("btn-replay");
    const resultActionsEl = document.getElementById("result-actions");
    const audioEl = document.getElementById("sfx-roulette");

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        let universeKey = null;
        try {
            universeKey = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            universeKey = null;
        }

        if (!universeKey || typeof games === "undefined" || !games[universeKey]) {
            window.location.replace("game.html");
            return;
        }

        universeData = games[universeKey];
        universeNameEl.textContent = universeData.name.toUpperCase();
        nameEl.textContent = "?";

        launchBtn.disabled = true;
        launchBtn.textContent = "CHARGEMENT...";
        preloadImages(universeData.characters, PRELOAD_TIMEOUT).then(function () {
            launchBtn.disabled = false;
            launchBtn.textContent = "LANCER LA ROULETTE";
        });

        launchBtn.addEventListener("click", handleLaunchClick);
        replayBtn.addEventListener("click", handleLaunchClick);
    }

    function preloadImages(characters, timeoutMs) {
        const promises = characters.map(function (c) {
            return new Promise(function (resolve) {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = c.image;
            });
        });

        const timeout = new Promise(function (resolve) {
            setTimeout(resolve, timeoutMs);
        });

        return Promise.race([Promise.all(promises), timeout]);
    }

    function handleLaunchClick() {
        if (isSpinning) return;
        runSpin();
    }

    function runSpin() {
        isSpinning = true;
        launchBtn.disabled = true;
        replayBtn.disabled = true;
        resultBannerEl.hidden = true;
        resultActionsEl.hidden = true;
        launchBtn.hidden = false;

        const winner = pickWinner(universeData.characters, lastCharacterId);
        const delays = buildStepDelays(SPIN_STEPS, ROULETTE_DURATION);

        unlockAudio();
        scheduleStep(0, delays, winner);
    }

    function pickWinner(characters, excludeId) {
        const pool = characters.filter(function (c) {
            return c.id !== excludeId;
        });
        const index = Math.floor(Math.random() * pool.length);
        return pool[index];
    }

    function pickRandomForSpin(characters) {
        const index = Math.floor(Math.random() * characters.length);
        return characters[index];
    }

    function buildStepDelays(steps, totalDuration) {
        const weights = [];
        let weightSum = 0;

        for (let i = 0; i < steps; i++) {
            const progress = i / (steps - 1);
            const weight = 1 + Math.pow(progress, 2) * 5;
            weights.push(weight);
            weightSum += weight;
        }

        return weights.map(function (w) {
            return Math.round((w / weightSum) * totalDuration);
        });
    }

    function scheduleStep(index, delays, winner) {
        if (index >= delays.length) {
            finishSpin(winner);
            return;
        }

        setTimeout(function () {
            const isLast = index === delays.length - 1;
            const character = isLast ? winner : pickRandomForSpin(universeData.characters);
            updateReelDisplay(character, !isLast);
            playTick();
            scheduleStep(index + 1, delays, winner);
        }, delays[index]);
    }

    function updateReelDisplay(character, spinning) {
        setPhoto(character.image, character.name);
        nameEl.textContent = spinning ? character.name.toUpperCase() : character.name;

        photoWrapEl.classList.remove("is-spinning", "is-final");
        void photoWrapEl.offsetWidth; /* force le redémarrage de l'animation CSS */
        photoWrapEl.classList.add(spinning ? "is-spinning" : "is-final");
    }

    function setPhoto(src, alt) {
        photoWrapEl.classList.remove("is-missing");
        photoEl.onerror = function () {
            photoWrapEl.classList.add("is-missing");
        };
        photoEl.src = src;
        photoEl.alt = alt;
    }

    function finishSpin(winner) {
        resultBannerEl.hidden = false;
        resultActionsEl.hidden = false;
        launchBtn.hidden = true;
        replayBtn.disabled = false;

        lastCharacterId = winner.id;
        isSpinning = false;

        stopAudio();
    }

    function unlockAudio() {
        if (!audioEl) return;
        try {
            audioEl.currentTime = 0;
        } catch (e) {
            /* certains navigateurs refusent avant le premier play, sans gravité */
        }
    }

    function playTick() {
        if (!audioEl) return;
        try {
            audioEl.currentTime = 0;
            const playPromise = audioEl.play();
            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(function () {
                    /* lecture bloquée (ex: mobile) : le jeu continue sans son */
                });
            }
        } catch (e) {
            /* pas de son disponible : le jeu continue normalement */
        }
    }

    function stopAudio() {
        if (!audioEl) return;
        try {
            audioEl.pause();
            audioEl.currentTime = 0;
        } catch (e) {
            /* rien à faire */
        }
    }
})();
