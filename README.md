# Alpha Trainer

Framework d'apprentissage d'alphabets (React Native + Expo Router + TypeScript + Zustand).

## Lancer le projet

```bash
npm install
npx expo start
w
npx expo install react-native-web react-dom
```

⚠️ Il manque les fichiers `.ttf` réels dans `assets/fonts/` (voir le README de
ce dossier) — je n'avais pas d'accès réseau pour les télécharger.

## Nouveautés de cette itération

- **Header persistant** (`components/AppHeader.tsx`) : le bouton ⚙️ est visible sur tous les écrans, y compris pendant le quiz, avec un bouton retour — plus moyen de rester coincé dans une session.
- **Roue crantée animée** au survol (`components/SettingsGearButton.tsx`, effet web/desktop uniquement — pas d'équivalent hover sur mobile tactile).
- **Cartes d'alphabet** : reflet + glow coloré au survol, couleur définie par alphabet via `themeColor` dans `data/*/alphabet.ts`.
- **Tutoriel → aléatoire** : chaque alphabet démarre en ordre séquentiel ; une fois tous les caractères réussis au moins une fois, le tirage devient aléatoire automatiquement (`utils/quizOrder.ts`). Un toggle "mode aléatoire direct" dans les paramètres permet de sauter cette étape.
- **Polices séparées** : une police pour les caractères (kana/kanji/hangul) et une pour le romaji, réglables indépendamment, avec un espace propre entre les deux blocs de prévisualisation.
- **Langue de l'app** : vrai menu déroulant, pré-rempli automatiquement selon la langue de l'appareil/navigateur au premier lancement (`utils/detectLanguage.ts`, via `expo-localization`).
- **"Votre réponse"** : affiché en gris clair discret dans le quiz (au lieu du rouge plein), pour ne pas voler l'attention à la bonne réponse.
- **XP & niveaux** (`store/useXp.ts`, `utils/xp.ts`) : 100 XP par niveau (valeur arbitraire, à ajuster). Les récompenses "one-shot" (maîtrise d'un alphabet, défi quotidien) utilisent une clé unique pour ne jamais être accordées deux fois.
- **Bonus de maîtrise** (`utils/mastery.ts`) : +150 XP une seule fois quand le taux de réussite pondéré d'un alphabet dépasse 90%.
- **Défis quotidiens** (`data/challenges.ts`, `store/useDailyChallenges.ts`) : tous les hiragana, tous les katakana, 30 kanji aléatoires parmi ceux débloqués. Le tirage est stable sur 24h (seed = date du jour) via `utils/seededRandom.ts`.
- **Déblocage des kanji par tranche de 50** (`utils/kanjiUnlock.ts`) — actif dès que le corpus de kanji dépassera l'échantillon actuel de 4 entrées.
- **Écran Profil** (`app/profile.tsx`) : XP/niveau, barre de maîtrise par alphabet, liste des défis du jour avec réclamation.

Toutes les valeurs numériques (XP par défi, seuil de maîtrise, taille des tranches de kanji) sont des constantes isolées dans `utils/` — faciles à retoucher sans toucher au reste du code.

## Roadmap connue (architecture prête, pas encore implémentée)

- **Caractères spéciaux par langue** (français, espagnol, anglais, allemand...) : chaque langue latine avec accents devient un nouveau `LanguageModule`, exactement comme `data/kr/`. Aucune restructuration nécessaire.
- **Langues anciennes** (latin, hittite, vieil anglais, grec ancien, hiéroglyphes égyptiens) : prévues comme futurs `LanguageModule`. Pistes de police notées pour plus tard :
  - Hiéroglyphes : *Noto Sans Egyptian Hieroglyphs* (Unicode, Google Fonts) pour un rendu universel, ou *JSesh* (éditeur de référence des égyptologues) pour un traitement plus complet. Le rendu (alignement en quadrats, orientation) demandera un travail dédié, volontairement reporté à après la stabilisation du cœur de l'app.
  - Grec ancien : IFAO-Grec Unicode, GFS Porson/Didot, New Athena Unicode, ou la collection de Georges Douros.
- **Vocabulaire / dictionnaire** : un futur import (mot, sens, genre grammatical...) viendra compléter la structure type `KanjiEntry`.
- **Tutoriel de frappe** : pour le japonais (romaji → kana) comme pour les langues anciennes, un mini-tutoriel de saisie avant le premier quiz de chaque système qui le demande.

## Convention de code appliquée dans tout le repo

- **1 fonctionnalité = 1 fonction** : chaque fonction a une seule responsabilité
  (ex: `checkAnswer`, `computeWeightedSuccessRate`, `getAlphabetById`...).
- **Fichiers courts, peu de fonctions par fichier** : la logique complexe
  (formulaire settings, session de quiz) est extraite dans des hooks dédiés
  (`hooks/useSettingsForm.ts`, `hooks/useQuizSession.ts`) plutôt que codée
  directement dans les composants ou écrans.
- **Aucune fonction > 42 lignes** : dès qu'une logique s'allongeait, elle a été
  découpée (ex: `UnsavedChangesDialog` séparé de `SettingsModal`, `PreviewBox`
  séparé de `FontSelector`).

## Ajouter une nouvelle langue

1. Créer `data/<code>/` (ex: `data/ru/`).
2. Créer les fichiers d'alphabet (ex: `cyrillic.ts`) avec des `LetterEntry[]`
   (ou `KanjiEntry[]` pour un système à sinogrammes).
3. Créer `data/<code>/alphabet.ts` qui exporte un `LanguageModule` regroupant
   ces alphabets (copier `data/kr/alphabet.ts` comme modèle).
4. Ajouter ce module dans `data/registry.ts`.
5. Ajouter les clés `alphabets.xxx` dans `i18n/fr.json`, `en.json`, `jp.json`.

Aucune autre partie de l'app (écrans, quiz, radar, cartes) n'a besoin d'être
modifiée : elles lisent toutes `getAllAlphabets()` / `getAlphabetById()`.

## Structure

```
app/            écrans Expo Router (composition uniquement)
components/     composants UI, chacun avec une seule responsabilité
data/           un dossier par langue + registry.ts (agrégateur central)
hooks/          logique extraite des écrans (quiz, formulaire settings)
i18n/           tous les textes, aucune chaîne en dur dans les composants
store/          zustand : settings, progression, i18n
utils/          fonctions pures (scoring, validation, polices)
```

## Limites connues de ce scaffold

- Données hiragana/katakana complètes, mais kanji et hangul volontairement
  limités à un échantillon (structure prête pour être étendue).
- Radar dessiné en SVG maison (`components/RadarChart.tsx`) — pas de lib de
  charting RN incluse, pour rester léger.
- Polices : fichiers binaires non fournis (voir `assets/fonts/README.md`).
