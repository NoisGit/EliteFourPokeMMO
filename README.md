# Farm Liga PokeMMO

Guía visual para farmear las Ligas de PokeMMO por región, miembro del Alto Mando/Campeón y Pokémon rival.

## Características

- Interfaz responsive con React, TypeScript, Vite y Tailwind CSS.
- Español como idioma principal e inglés como idioma alternativo.
- Carga dinámica de estrategias desde archivos JSON por región y líder.
- Tarjetas rediseñadas para regiones, líderes y Pokémon.
- Sprites modernos: primero intenta cargar sprites de generación 8 y luego usa fallbacks animados/locales.
- Leyenda para boosts frecuentes como Maquinación, Velocidad X y Precisión X.
- GitHub Pages configurado para desplegar desde `main`.

## Requisitos

- Node.js 20 o superior recomendado.
- npm.

## Instalación

```bash
git clone https://github.com/NoisGit/EliteFourPokeMMO.git
cd EliteFourPokeMMO
npm install
```

## Desarrollo local

```bash
npm run dev
```

Luego abre `http://localhost:5173`.

## Build

```bash
npm run build
```

El build se genera en `dist/`.

## Deploy en GitHub Pages

El workflow `.github/workflows/deploy.yml` despliega automáticamente cuando se hace push a `main`.

La app queda preparada para publicarse con base path:

```ts
base: '/EliteFourPokeMMO/'
```

URL esperada:

```text
https://noisgit.github.io/EliteFourPokeMMO/
```

## Estructura principal

```text
src/
  components/      Componentes de interfaz
  data/            Estrategias JSON por región y líder
  hooks/           Carga dinámica de datos
  i18n/            Textos ES/EN
  interfaces/      Tipos TypeScript
  utils/           Helpers de sprites y traducción de estrategias
```

## Notas de estrategia

La guía conserva los JSON actuales como fuente principal. La traducción al inglés se aplica desde una capa de helpers para mantener el contenido existente sin duplicarlo.

Ejemplo de interpretación de boosts:

- `+2` con Maquinación: +2 niveles de Ataque Especial.
- `+2` con Velocidad X: +2 niveles de Velocidad.
- `+2` con Precisión X: +2 niveles de Precisión.
- `+4` y `+6`: boosts acumulados.
