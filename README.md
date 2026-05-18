# PokeMMO Elite Four Farming Guide

<p align="center">
  <img src="./src/assets/league-farm-banner.png" alt="PokeMMO Elite Four Farming Guide" width="760" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-live-222222?logo=githubpages&logoColor=white" alt="GitHub Pages" />
</p>

A visual guide for farming PokeMMO Elite Four rematches by region, trainer, and opposing Pokémon.

The project focuses on fast decision-making during battles: select a region, pick the Elite Four member or Champion, choose the opposing Pokémon, and follow the recommended strategy.

## Live demo

```text
https://noisgit.github.io/EliteFourPokeMMO/
```

<p align="center">
  <a href="https://noisgit.github.io/EliteFourPokeMMO/">
    <img src="./src/assets/league-farm-banner.png" alt="Open live guide" width="520" />
  </a>
</p>

## Features

- Responsive interface built with React, TypeScript, Vite, and Tailwind CSS.
- Spanish as the primary in-app language, with an English UI option.
- Dynamic strategy loading from JSON files grouped by region and trainer.
- Redesigned cards for regions, trainers, Pokémon, and strategy steps.
- Pokémon HOME sprites with Scarlet/Violet, Gen 8, animated, and local fallbacks.
- Smooth auto-scroll from Pokémon cards to the selected strategy.
- Team preview modal for the recommended team.
- Context-aware boost notes for common setup routes.
- GitHub Pages deployment from the `main` branch.

## Battle strategy notes

Strategy text is intentionally short and direct. The goal is to explain what to do on each turn without turning each route into a long paragraph.

Each strategy JSON should keep the opening action in `initialMove` and move conditions, branches, and follow-up steps into `tricks` and nested `variant` entries.

Boost values are contextual. Do not read every `+2`, `+4`, or `+6` as the same stat.

Examples:

- `Gengar +2/+4` means using **Nasty Plot** until the requested Special Attack boost.
- `Gengar +4 and +2 Speed` means using **Nasty Plot** until +4 Special Attack and **X Speed** for +2 Speed.
- `Poliwrath +6` means using **Belly Drum** to maximize Attack.
- `Volcarona +1/+2/+3` means stacking **Quiver Dance**.
- `X Speed` gives the Speed boost when the route asks for it.
- `X Accuracy` gives the Accuracy boost when the route asks for it.
- Pivots should be described clearly, for example: `Politoed enters as a pivot`.
- If a Pokémon must be used to bring another teammate safely, describe it as `let it faint` or `let it be weakened`.

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

## Security checks

Run the dependency audit before merging dependency updates:

```bash
npm run security:audit
```

See [`SECURITY.md`](./SECURITY.md) for the project security policy.

## GitHub Pages deployment

The project is configured to deploy automatically with GitHub Actions when changes are pushed to `main`.

The Vite base path is:

```ts
base: '/EliteFourPokeMMO/'
```

Production URL:

```text
https://noisgit.github.io/EliteFourPokeMMO/
```

## Project structure

```text
src/
  assets/          Local images and visual assets
  components/      UI components
  data/            Strategy JSON files by region and trainer
  hooks/           Dynamic data loading
  i18n/            Spanish and English UI copy
  interfaces/      TypeScript interfaces
  utils/           Sprite and strategy text helpers
```

## Strategy data structure

Strategies are stored as JSON files. Each Pokémon has a single opening action and a list of strategy steps.

```json
{
  "id": "slowbro",
  "name": "Slowbro",
  "image": "/placeholder.svg?height=80&width=80",
  "initialMove": "Use Stealth Rock.",
  "tricks": [
    {
      "detail": "If Lucario comes in.",
      "variant": [
        {
          "detail": "Switch to Gengar and use Encore.",
          "variant": [
            {
              "detail": "Gengar uses Nasty Plot until +4 and X Speed for +2 Speed.",
              "variant": []
            }
          ]
        }
      ]
    }
  ]
}
```

## Development workflow

Use small branches and pull requests.

Branch flow:

```text
feature/* / fix/* / chore/* / docs/* → develop → main
```

Rules:

- `main` is production and deploys to GitHub Pages.
- `develop` is the integration branch for ongoing work.
- Feature, fix, chore, and docs branches must open pull requests into `develop`.
- When `develop` is stable, open a release pull request from `develop` into `main`.
- Pull requests and commit messages should be written in English.
- Issues and gameplay task descriptions can be written in Spanish.
