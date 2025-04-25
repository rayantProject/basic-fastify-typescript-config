

## 🚀 basic-fastify-typescript-config

Configuration de base pour démarrer un projet **Fastify** avec **TypeScript**, **esbuild**, et des outils modernes de développement.

### 📦 Stack utilisée
- **Fastify** – Framework HTTP ultra-rapide
- **TypeScript** – Typage fort côté Node.js
- **esbuild** – Bundler rapide pour le build + watch
- **nodemon** + **wait-on** – Rechargement automatique à chaud
- **eslint** – Linting du code
- **SWC** – Compilation alternative rapide (optionnelle)
- **Decorator Plugin** – Support des décorateurs via `esbuild`

---

### 📁 Structure de base

```
.
├── src/
│   └── index.ts         # Point d'entrée Fastify
├── dist/                # Fichiers compilés (output esbuild)
├── esbuild.config.mjs   # Config esbuild (build & dev)
├── tsconfig.json        # Config TypeScript
├── package.json
└── ...
```

---

### ⚙️ Scripts

| Commande              | Description                                    |
|-----------------------|------------------------------------------------|
| `yarn build:tsc`      | Compile avec TypeScript (tsc uniquement)       |
| `yarn build:esbuild`  | Build le projet avec esbuild                   |
| `yarn dev`            | Build + watch + restart automatique avec nodemon |
| `yarn start`          | Démarre la version buildée (`dist/index.js`)   |
| `yarn lint`           | Lint les fichiers `.js` et `.ts`               |

---

### 🚧 Développement

Lance ce projet en mode dev :

```bash
yarn dev
```

Cela :
- build ton code TypeScript avec esbuild,
- attend que `dist/index.js` soit généré,
- puis le lance avec nodemon, avec hot-reload automatique.

---

### 📦 Build de production

```bash
yarn build:esbuild
yarn start
```
