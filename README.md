


# 🚀 basic-fastify-typescript-config

A lightweight setup for a **Fastify** project with **TypeScript**, optimized for fast development and efficient builds using **esbuild**.

## 📦 Tech Stack
- **Fastify** – Ultra-fast HTTP framework
- **TypeScript** – Static typing for Node.js
- **esbuild** – Lightning-fast bundler for build and watch
- **nodemon** + **wait-on** – Automatic reloading during development
- **ESLint** – Code linting and formatting
- **SWC** – Optional fast compilation alternative
- **Typebox** – TypeScript schema validation
- **Decorators** – Support for decorators via `esbuild-plugin-decorator`

## 📁 Project Structure

```
.
├── src/
│   └── index.ts         # Fastify application entry point
├── dist/                # Compiled files (esbuild output)
├── esbuild.config.mjs   # esbuild configuration (build & dev)
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── .env                 # Environment variables (optional)
```

## ⚙️ Scripts

| Command              | Description                                      |
|----------------------|--------------------------------------------------|
| `yarn build:tsc`     | Compiles the project with TypeScript (tsc)      |
| `yarn build:esbuild` | Compiles the project with esbuild               |
| `yarn dev`           | Development mode with watch and hot-reload      |
| `yarn start`         | Runs the built application (`dist/index.js`)    |
| `yarn lint`          | Lints `.js` and `.ts` files                     |

## 🚀 Getting Started

### Prerequisites
- Node.js (version >= 18.x recommended)
- Yarn (version 4.9.1)

### Installation
```bash
yarn install
```

### Development
Start development mode with automatic reloading:
```bash
yarn dev
```

This script:
- Compiles TypeScript code with esbuild in watch mode,
- Waits for `dist/index.js` to be generated,
- Runs the application with nodemon for hot-reload.

### Production
Build and run the application for production:
```bash
yarn build:esbuild
yarn start
```

## 🔧 Configuration
- **Environment**: Uses `dotenv` to load environment variables from a `.env` file.
- **Linting**: Configured with `@eslint/js` and `typescript-eslint` for strict rules.
- **Typebox**: Enables typed schema validation for Fastify.

## 🛠️ Customization
- Modify `esbuild.config.mjs` to tweak build options (e.g., minification, sourcemaps).
- Adjust `tsconfig.json` for specific TypeScript settings.
- Add Fastify plugins using `fastify-plugin` for modularity.

## 📝 Notes
- The `esbuild-plugin-decorator` enables TypeScript decorator support.
- `pino-pretty` is included for clean log output in development.
- The setup is optimized for lightweight projects but can be extended.

## 📜 License
MIT

