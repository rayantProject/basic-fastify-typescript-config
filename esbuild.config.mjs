
import * as esbuild from "esbuild";
import copyPlugin from "esbuild-plugin-copy";
import { esbuildPluginDecorator } from "esbuild-plugin-decorator";
import { rmSync } from "fs";


const isDev = process.argv.includes("--dev");

const outdir = "dist";

// Nettoyage du dossier de sortie (safe cross-platform)
if (!isDev) {
  try {
    rmSync(outdir, { recursive: true, force: true });
    console.log(`✅ Dossier "${outdir}" nettoyé.`);
  } catch (err) {
    console.warn(`⚠️ Impossible de nettoyer le dossier "${outdir}":`, err);
  }
}


const esbuildConfig = {
  entryPoints: ["src/index.ts"],
  minify: !isDev,
  sourcemap: true,
  bundle: true,
  platform: "node",
  target: "node23",
  outfile: "dist/index.js",
  external: ["node:*", "fastify", "@fastify/*"],
  plugins: [
    esbuildPluginDecorator({
      tsconfigPath: "tsconfig.json",
    }),
    copyPlugin({
      assets: {
        from: ["src/config/**/*", "src/assets/**/*"],
        to: ["dist/config", "dist/assets"],
        filter: (file) => !file.endsWith(".env")
      },
    }),
  ],
  loader: { ".json": "json" },
  metafile: !isDev,
};

const start = async () => {
  const context = await esbuild.context(esbuildConfig);

  // Handle graceful shutdown in watch mode
  process.on("SIGINT", async () => {
    await context.dispose();
    console.log("Build context disposed.");
    process.exit(0);
  });

  if (isDev) {
    console.log("Building initial bundle...");
    await context.rebuild(); // Ensure initial build completes
    console.log("Initial build complete. Watching for changes...");
    await context.watch();
  } else {
    console.log("Building...");
    const result = await context.build();
    if (result.metafile) {
      console.log(await esbuild.analyzeMetafile(result.metafile));
    }
  }
};



start()
  .then(() => {
    console.log("Build completed successfully.");
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
