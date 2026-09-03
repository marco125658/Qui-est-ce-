/**
 * data.js — données du jeu.
 *
 * Tu peux modifier ici, sans toucher à aucun autre fichier :
 *   - le nom de chaque personnage (propriété "name")
 *   - le chemin de sa photo (propriété "image"), si tu changes de nom de fichier
 *
 * Chaque univers contient exactement 24 personnages (id 1 à 24).
 * Les photos attendues sont : assets/himym/01.png à 24.png
 *                              assets/crazy-game/01.png à 24.png
 */

const games = {
    himym: {
        name: "How I Met Your Mother",
        characters: [
            { id: 1, name: "Barney", image: "assets/himym/01.png" },
            { id: 2, name: "Lily", image: "assets/himym/02.png" },
            { id: 3, name: "Robin", image: "assets/himym/03.png" },
            { id: 4, name: "Marshall", image: "assets/himym/04.png" },
            { id: 5, name: "Ted", image: "assets/himym/05.png" },
            { id: 6, name: "Tracy", image: "assets/himym/06.png" },
            { id: 7, name: "Penny", image: "assets/himym/07.png" },
            { id: 8, name: "Lucke", image: "assets/himym/08.png" },
            { id: 9, name: "Stella", image: "assets/himym/09.png" },
            { id: 10, name: "Gabe ?", image: "assets/himym/10.png" },
            { id: 11, name: "Marvin", image: "assets/himym/11.png" },
            { id: 12, name: "Jerry", image: "assets/himym/12.png" },
            { id: 13, name: "Missy", image: "assets/himym/13.png" },
            { id: 14, name: "Le capitaine", image: "assets/himym/14.png" },
            { id: 15, name: "Victoria", image: "assets/himym/15.png" },
            { id: 16, name: "Simon", image: "assets/himym/16.png" },
            { id: 17, name: "The karaté kid", image: "assets/himym/17.png" },
            { id: 18, name: "Carl", image: "assets/himym/18.png" },
            { id: 19, name: "Randjit", image: "assets/himym/19.png" },
            { id: 20, name: "Abby", image: "assets/himym/20.png" },
            { id: 21, name: "Jeanette", image: "assets/himym/21.png" },
            { id: 22, name: "Simon", image: "assets/himym/22.png" },
            { id: 23, name: "Robin Sparkle", image: "assets/himym/23.png" },
            { id: 24, name: "Marshall's doppelgänger", image: "assets/himym/24.png" }
        ]
    },

    crazyGame: {
        name: "Le Crazy Game",
        characters: [
            { id: 1, name: "Théo", image: "assets/crazy-game/01.png" },
            { id: 2, name: "Violetto", image: "assets/crazy-game/02.png" },
            { id: 3, name: "Lucas", image: "assets/crazy-game/03.png" },
            { id: 4, name: "ClotHilde", image: "assets/crazy-game/04.png" },
            { id: 5, name: "Capucine", image: "assets/crazy-game/05.png" },
            { id: 6, name: "Winnie", image: "assets/crazy-game/06.png" },
            { id: 7, name: "Manon", image: "assets/crazy-game/07.png" },
            { id: 8, name: "Emile", image: "assets/crazy-game/08.png" },
            { id: 9, name: "Mathilde", image: "assets/crazy-game/09.png" },
            { id: 10, name: "Loïc", image: "assets/crazy-game/10.png" },
            { id: 11, name: "Kiki", image: "assets/crazy-game/11.png" },
            { id: 12, name: "Blue", image: "assets/crazy-game/12.png" },
            { id: 13, name: "Manon", image: "assets/crazy-game/13.png" },
            { id: 14, name: "X man", image: "assets/crazy-game/14.png" },
            { id: 15, name: "Zoé", image: "assets/crazy-game/15.png" },
            { id: 16, name: "Léo", image: "assets/crazy-game/16.png" },
            { id: 17, name: "Dédé le padre", image: "assets/crazy-game/17.png" },
            { id: 18, name: "Crrousty Luc", image: "assets/crazy-game/18.png" },
            { id: 19, name: "LMFAO", image: "assets/crazy-game/19.png" },
            { id: 20, name: "Luc", image: "assets/crazy-game/20.png" },
            { id: 21, name: "Juliette", image: "assets/crazy-game/21.png" },
            { id: 22, name: "Gilles", image: "assets/crazy-game/22.png" },
            { id: 23, name: "La sorcière", image: "assets/crazy-game/23.png" },
            { id: 24, name: "Tibo", image: "assets/crazy-game/24.png" }
        ]
    }
};
