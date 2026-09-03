# Qui est ce ?

Petit jeu web de hasard (inspiré de « Qui est-ce ? ») avec deux univers :
**How I Met Your Mother** et **Le Crazy Game**, 24 personnages chacun.

100 % statique : HTML + CSS + JavaScript vanilla, aucun serveur, aucune
base de données, aucun compte.

## Où mettre les photos

- `assets/himym/01.png` → `assets/himym/24.png`
- `assets/crazy-game/01.png` → `assets/crazy-game/24.png`

Tant qu'une photo n'est pas là (ou porte un mauvais nom), le jeu affiche
un simple bloc avec un `?` à la place — rien ne casse. Si tu utilises des
photos au format `.jpg` plutôt que `.png`, change l'extension dans
`js/data.js` (voir ci-dessous) en plus du nom de fichier.

## Où modifier les noms des personnages

Tout se passe dans [`js/data.js`](js/data.js). Chaque personnage a cette forme :

```javascript
{ id: 5, name: "Personnage 05", image: "assets/himym/05.png" }
```

Remplace uniquement le texte entre guillemets après `name:`. Pas besoin de
toucher à autre chose.

## Où mettre le son de la roulette

`assets/sounds/roulette.wav`. Sans ce fichier, le jeu fonctionne
normalement, juste sans son.

Le son actuellement en place est un effet de type « victoire » (assez
long, ~4 s) : il est donc joué **une fois, au moment où le personnage
est révélé**, plutôt que répété à chaque image pendant le défilement
(un son aussi long ferait un effet de bégaiement s'il était redémarré
20 fois en 2 secondes). Si tu obtiens un jour un vrai bruit de « tac »
mécanique court, dis-le à Claude Code : il faudra rebasculer sur une
lecture répétée pendant le défilement plutôt qu'une lecture unique à
la fin.

## Réglages rapides

Dans [`js/roulette.js`](js/roulette.js), en haut du fichier :

- `ROULETTE_DURATION` : durée d'une roulette en millisecondes (2000 = 2 s)
- `SPIN_STEPS` : nombre d'images qui défilent pendant l'animation

Les couleurs (rouge, bleu, jaune...) sont regroupées en haut de
[`css/style.css`](css/style.css), dans le bloc `:root`.

## Lancer le site en local

Le plus simple : double-clique sur `index.html`, il s'ouvre dans ton
navigateur. Le jeu fonctionne déjà comme ça.

Si tu préfères passer par un petit serveur local (recommandé pour se
rapprocher des conditions réelles) :

```bash
npx serve .
```

ou, si tu as Python installé :

```bash
python -m http.server 8000
```

puis ouvre l'adresse indiquée dans le terminal (ex: http://localhost:8000).

## Déployer sur GitHub Pages

1. Crée un dépôt sur GitHub et pousse ce dossier dedans.
2. Dans le dépôt : **Settings → Pages → Build and deployment → Source**,
   choisis la branche `main` et le dossier `/ (root)`.
3. GitHub te donne une URL du type `https://ton-compte.github.io/nom-du-depot/`.

**Point important à savoir** : GitHub Pages sur un dépôt **privé** n'est
disponible que sur les comptes GitHub payants (Pro/Team/Enterprise). Avec
un compte gratuit, il faut soit rendre le dépôt public pour utiliser
Pages, soit héberger ailleurs (Netlify ou Vercel, par exemple, proposent
un hébergement gratuit d'un dépôt privé). Le contenu du jeu n'a rien de
confidentiel, donc rendre le dépôt public au moment du déploiement ne
pose pas de problème particulier si tu choisis cette option.

Aucun secret, clé API ou information personnelle n'est présent dans ce
projet.

## Structure du projet

```
qui-est-ce/
├── index.html          page d'accueil
├── game.html            choix de l'univers
├── roulette.html         la roulette
├── css/style.css
├── js/
│   ├── data.js           données des personnages (à éditer)
│   ├── home.js           animation d'accueil
│   ├── game.js           sélection de l'univers
│   └── roulette.js       logique de la roulette
└── assets/
    ├── himym/            photos HIMYM (01.png à 24.png)
    ├── crazy-game/       photos Crazy Game (01.png à 24.png)
    └── sounds/           roulette.wav
```
