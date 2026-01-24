import { VaderPlugin } from "vaderjs/plugins";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";

const PROJECT_ROOT = process.cwd();

/* --------------------------- utils --------------------------- */

function spawnSync(cmd: string, args: string[], opts: any = {}) {
  const { status } = require("child_process").spawnSync(cmd, args, { stdio: "inherit", ...opts });
  if (status !== 0) throw new Error(`${cmd} failed with exit code ${status}`);
  return status;
}

function tailwindInstalled(): boolean {
  try {
    spawnSync("bunx", ["tailwindcss", "--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Ensure root.css exists and copy to public/styles.css if missing
 */
function ensureStyles(inputPath: string) {
  const outputPath = path.join(PROJECT_ROOT, "public/styles.css");

  if (!fs.existsSync(outputPath)) {
    if (!fs.existsSync(inputPath)) {
      fs.writeFileSync(
        inputPath,
        `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n@import "daisyui";`
      );
      console.log(`Created default root.css at ${inputPath}`);
    }
    fs.copyFileSync(inputPath, outputPath);
  }
}

/**
 * Auto-generate tailwind.config.js if missing
 */
function ensureTailwindConfig() {
  const configPath = path.join(PROJECT_ROOT, "tailwind.config.js");

  if (!fs.existsSync(configPath)) {
    const configContent = `module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
};`;

    fs.writeFileSync(configPath, configContent);
    console.log(`✅ Created tailwind.config.js`);
  }
}

/**
 * Run tailwind build
 */
async function runTailwind(input: string, output: string) {
  return new Promise<void>((resolve, reject) => {
    const proc = spawn("bunx", ["tailwindcss", "-i", input, "-o", output], { stdio: "inherit" });
    proc.on("close", (code) => {
      if (code !== 0) reject(new Error(`Tailwind exited with ${code}`));
      else resolve();
    });
  });
}

/**
 * Auto-install dependencies if missing
 */
async function autoInstallDeps() {
  console.log("📦 Tailwind dependencies missing, installing...");
  // Clear Bun cache to avoid stale deps
  spawnSync("bun", ["pm", "cache", "rm"]);
  // Install Node/Bun deps
  spawnSync("bun", [
    "add",
    "-d",
    "tailwindcss@latest",
    "@tailwindcss/cli@latest",
    "daisyui@latest",
    "postcss@latest",
    "autoprefixer@latest",
  ]);
  console.log("✅ Dependencies installed.");
}

/* --------------------------- plugin --------------------------- */

const plugin: VaderPlugin = {
  name: "Vader Aria",
  version: "0.1.0",
  description: "Tailwind + DaisyUI integration for VaderJS",

  async onBuildStart(api) {
    const rootCss = path.join(PROJECT_ROOT, "root.css");

    // Ensure root CSS exists
    ensureStyles(rootCss);

    // Auto-install deps if Tailwind is not available
    if (!tailwindInstalled()) {
      await autoInstallDeps();
    }

    // Ensure tailwind.config.js exists
    ensureTailwindConfig();

    // Run Tailwind build
    console.log("🚀 Running TailwindCSS build...");
    const output = path.join(PROJECT_ROOT, "public/styles.css");
    await runTailwind(rootCss, output);

    // Inject link into HTML
    api.injectHTML(`<link rel="stylesheet" href="/styles.css" />`);
    console.log("✅ TailwindCSS + DaisyUI loaded");
  },

  onBuildFinish(api) {
    // Optional cleanup
  },
};

export default plugin;
