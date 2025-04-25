
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
  external: ["node:*", "fastify", "@fastify/*", "dotenv/config"],
  plugins: [
    esbuildPluginDecorator({
      tsconfigPath: "tsconfig.json",
    }),
    copyPlugin({
      assets: {
        from: ["src/config/**/*", "src/assets/**/*"],
        to: ["dist/config", "dist/assets"],
        filter: (file) => !file.endsWith(".env"),
      },
    }),
  ],
  loader: { ".json": "json" },
  metafile: !isDev,
};

const start = async () => {
  if (isDev) {
    const context = await esbuild.context(esbuildConfig);

    process.on("SIGINT", async () => {
      await context.dispose();
      console.log("Build context disposed.");
      process.exit(0);
    });

    console.log("Building initial bundle...");
    await context.rebuild();
    console.log("Initial build complete. Watching for changes...");
    await context.watch();
  } else {
    console.log("Building...");
    const result = await esbuild.build(esbuildConfig); // <<< ICI, build direct sans context
    if (result.metafile) {
      console.log(await esbuild.analyzeMetafile(result.metafile));
    }
    console.log("Build finished.");
    process.exit(0); // <<< Ajoute ça pour forcer la sortie propre
  }
};


start().catch((error) => {
  console.error("Build failed:", error);
  process.exit(1);
});
