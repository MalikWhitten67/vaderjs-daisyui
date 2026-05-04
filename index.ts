//@ts-nocheck
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
const PROJECT_ROOT = process.cwd();

/* --------------------------- Platform Detection --------------------------- */

interface ProjectInfo {
  isVaderJS: boolean;
  isVaderNative: boolean;
  platform: "vaderjs" | "vaderjs-native" | "unknown";
  packageJson: any;
}

function detectPlatform(): ProjectInfo {
  const packageJsonPath = path.join(PROJECT_ROOT, "package.json");
  
  if (!fs.existsSync(packageJsonPath)) {
    return {
      isVaderJS: false,
      isVaderNative: false,
      platform: "unknown",
      packageJson: {}
    };
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };
  
  const isVaderJS = "vaderjs" in deps;
  const isVaderNative = "vaderjs-native" in deps;
  
  let platform: "vaderjs" | "vaderjs-native" | "unknown" = "unknown";
  if (isVaderJS && !isVaderNative) {
    platform = "vaderjs";
  } else if (isVaderNative && !isVaderJS) {
    platform = "vaderjs-native";
  } else if (isVaderJS && isVaderNative) {
    // Both installed, prioritize native for native projects
    platform = "vaderjs-native";
  }
  
  return {
    isVaderJS,
    isVaderNative,
    platform,
    packageJson
  };
}

/* --------------------------- Dynamic Import --------------------------- */

async function getVaderPlugin(): Promise<any> {
  const { platform } = detectPlatform();
  
  if (platform === "vaderjs-native") {
    try {
      //@ts-ignore
      return await import("vaderjs-native/plugins");
    } catch (e) {
      console.warn("Failed to import from vaderjs-native/plugins, falling back to vaderjs/plugins");
    }
  }
  
  // Default to vaderjs
  try {
     //@ts-ignore
    return await import("vaderjs/plugins");
  } catch (e) {
    throw new Error(`Cannot find Vader.js plugins module. Install either vaderjs or vaderjs-native.`);
  }
}

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
  console.log(`Ensuring styles: input=${inputPath}, output=${outputPath}`);
  if (!fs.existsSync(outputPath)) {
    
    fs.copyFileSync(inputPath, outputPath);
  }
   if (!fs.existsSync(inputPath)) {
      fs.writeFileSync(
        inputPath,
        `@import "tailwindcss"; \n @plugin "daisyui";`
      );
      console.log(`Created default root.css at ${inputPath}`);
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
    proc.on("close", (code: number) => {
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

/* --------------------------- Plugin Factory --------------------------- */

async function createPlugin() {
  const { platform } = detectPlatform();
  const { VaderPlugin } = await getVaderPlugin();
  
  const plugin: InstanceType<typeof VaderPlugin> = {
    name: "Vader Aria",
    version: "0.1.0",
    description: `Tailwind + DaisyUI integration for ${platform}`,

    async onBuildStart(api: any) {
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
      console.log(`🚀 Running TailwindCSS build for ${platform}...`);
      const output = path.join(PROJECT_ROOT, "public/styles.css"); 
      await runTailwind(rootCss, output);

      // Inject link into HTML
      api.injectHTML(`<link rel="stylesheet" href="/styles.css" />`);
      console.log(`✅ TailwindCSS + DaisyUI loaded for ${platform}`);
    },

    onBuildFinish(api: any) {
      // Optional cleanup
    },
  };

  return plugin;
}

// Export as default function that creates the plugin
export default await createPlugin();