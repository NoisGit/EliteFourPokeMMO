# PokeMMO Elite Four Farming Guide

A visual guide for farming PokeMMO Elite Four rematches by region, trainer, and opposing Pokémon.

The project focuses on fast decision-making during battles: select a region, pick the Elite Four member or Champion, choose the opposing Pokémon, and follow the recommended strategy.

## Features

- Responsive interface built with React, TypeScript, Vite, and Tailwind CSS.
- Spanish as the primary in-app language, with an English UI option.
- Dynamic strategy loading from JSON files grouped by region and trainer.
- Redesigned cards for regions, trainers, Pokémon, and strategy steps.
- Gen 8-style Pokémon sprites with animated and local fallbacks.
- Context-aware boost notes for common setup routes.
- GitHub Pages deployment from the `main` branch.

## Battle strategy notes

Strategy text is intentionally short and direct. The goal is to explain what to do on each turn without turning each route into a long paragraph.

Boost values are contextual. Do not read every `+2`, `+4`, or `+6` as the same stat.

Examples:

- `Gengar +2` usually means using **Nasty Plot** to raise Special Attack.
- `Gengar +4` means stacking **Nasty Plot** twice.
- `Poliwrath +6` usually means using **Belly Drum** to maximize Attack.
- `Volcarona +1`, `+2`, or `+3` means stacking **Quiver Dance**.
- `X Speed` gives the Speed boost when the route asks for it.
- `X Accuracy` gives the Accuracy boost when the route asks for it.
- `Sacrifice Politoed` or `sacrifice Poliwrath` means letting that Pokémon faint so the next Pokémon can enter safely.

## Requirements

- Node.js 20 or higher is recommended.
- npm.

## Installation

```bash
git clone https://github.com/NoisGit/EliteFourPokeMMO.git
cd EliteFourPokeMMO
npm install
```

## Local development

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

The production build is generated in:

```text
dist/
```

## GitHub Pages deployment

The project is configured to deploy automatically with GitHub Actions when changes are pushed to `main`.

The Vite base path is:

```ts
base: '/EliteFourPokeMMO/'
```

Expected production URL:

```text
https://noisgit.github.io/EliteFourPokeMMO/
```

## Project structure

```text
src/
  components/      UI components
  data/            Strategy JSON files by region and trainer
  hooks/           Dynamic data loading
  i18n/            Spanish and English UI copy
  interfaces/      TypeScript interfaces
  utils/           Sprite and strategy text helpers
```

## Strategy data structure

Strategies are stored as JSON files. Each Pokémon has an opening action and a list of strategy steps.

```json
{
  "id": "slowbro",
  "name": "Slowbro",
  "initialMove": "TRAMPA ROCAS",
  "tricks": [
    {
      "detail": "Sale Lucario → cambia a Gengar, usa Otra Vez, usa Maquinación hasta +4 y luego usa Velocidad X para quedar +2 Velocidad.",
      "variant": [
        {
          "detail": "Mantén Otra Vez cada vez que puedas para controlar al rival."
        },
        {
          "detail": "Cuando Gengar esté listo, barre con Bola Sombra."
        }
      ]
    }
  ]
}
```

## Development workflow

Use small branches and pull requests.

Recommended branch naming examples:

```text
feature/improve-kanto-lorelei-strategies
docs/update-readme-english
fix/github-pages-deploy
```

Pull requests and commit messages should be written in English.

Issues and task descriptions can be written in Spanish to keep the gameplay planning clear.
