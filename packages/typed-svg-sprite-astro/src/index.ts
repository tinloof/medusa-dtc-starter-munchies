import { existsSync, watch } from "node:fs";
import { basename, dirname, extname, relative, resolve } from "node:path";
import type { AstroIntegration } from "astro";
import { generateIconComponent } from "./components.js";
import { generateSprite } from "./core.js";
import { generateTypesFile } from "./types.js";

export interface SpriteIntegrationOptions {
  /**
   * URL path where the sprite file will be served from.
   * @default "/"
   */
  url?: string;

  /**
   * Filename for the sprite file.
   * @default "sprite.svg"
   */
  filename?: string;

  /**
   * Directory containing SVG files to include in the sprite.
   * Relative to project root.
   * @default "public/icons"
   */
  inputDir?: string;

  /**
   * Output path for the sprite file.
   * Relative to project root.
   * @default "public/sprite.svg"
   */
  outputFile?: string;

  /**
   * Output path for the TypeScript types file.
   * Relative to project root.
   * @default "src/generated/icons.ts"
   */
  typesOutputFile?: string;

  /**
   * Whether to generate the Icon React component.
   * @default true
   */
  generateIconComponent?: boolean;

  /**
   * Output path for the Icon component file.
   * Relative to project root.
   * @default "src/generated/Icon.tsx"
   */
  iconComponentOutputFile?: string;
}

let watcherInitialized = false;

function generateSpriteAndTypes(
  inputDir: string,
  outputFile: string,
  spriteUrl: string,
  spriteFilename: string,
  typesOutputFile?: string,
  generateIcon?: boolean,
  iconComponentOutputFile?: string
): void {
  const symbols = generateSprite({
    inputDir,
    outputFile,
    verbose: true,
    minify: true,
    optimize: true,
  });

  if (typesOutputFile && symbols.length > 0) {
    generateTypesFile({
      symbols,
      spriteUrl,
      spriteFilename,
      outputFile: typesOutputFile,
      verbose: false,
    });

    if (generateIcon && iconComponentOutputFile) {
      const componentDir = dirname(
        resolve(process.cwd(), iconComponentOutputFile)
      );
      const typesFile = resolve(process.cwd(), typesOutputFile);
      const typesDir = dirname(typesFile);
      const typesFilename = basename(typesFile, extname(typesFile));

      const relativePath = relative(componentDir, typesDir).replace(/\\/g, "/");

      let importPath: string;
      if (relativePath === "") {
        importPath = `./${typesFilename}`;
      } else if (relativePath.startsWith("..")) {
        importPath = `${relativePath}/${typesFilename}`.replace(/\/+/g, "/");
      } else {
        const normalizedPath = relativePath.startsWith("./")
          ? relativePath
          : `./${relativePath}`;
        importPath = `${normalizedPath}/${typesFilename}`.replace(/\/+/g, "/");
      }

      generateIconComponent({
        outputFile: iconComponentOutputFile,
        typesFileRelativePath: importPath,
        verbose: false,
      });
    }
  }
}

function startWatcher(
  inputDir: string,
  outputFile: string,
  spriteUrl: string,
  spriteFilename: string,
  typesOutputFile?: string,
  generateIcon?: boolean,
  iconComponentOutputFile?: string
): void {
  if (watcherInitialized) {
    return;
  }

  const projectRoot = process.cwd();
  const absoluteInputDir = resolve(projectRoot, inputDir);

  if (!existsSync(absoluteInputDir)) {
    return;
  }

  watcherInitialized = true;
  console.log(`[svg-sprite] Watching ${inputDir} for changes...`);

  watch(absoluteInputDir, { recursive: true }, (_, filename) => {
    if (filename?.endsWith(".svg")) {
      console.log(`[svg-sprite] Change detected: ${filename}`);
      generateSpriteAndTypes(
        inputDir,
        outputFile,
        spriteUrl,
        spriteFilename,
        typesOutputFile,
        generateIcon,
        iconComponentOutputFile
      );
    }
  });
}

/**
 * Astro integration for generating SVG sprites with TypeScript types.
 *
 * @example
 * ```typescript
 * // astro.config.mjs
 * import { svgSprite } from '@tinloof/typed-svg-sprite-astro';
 *
 * export default defineConfig({
 *   integrations: [svgSprite()],
 * });
 *
 * // Then in your components:
 * import { HOME, SETTINGS } from '@/generated/icons';
 * import { Icon } from '@/generated/Icon';
 *
 * <Icon href={HOME} />
 * ```
 */
export function svgSprite(
  options?: SpriteIntegrationOptions
): AstroIntegration {
  const inputDir = options?.inputDir ?? "public/icons";
  const outputFile = options?.outputFile ?? "public/sprite.svg";
  const spriteUrl = options?.url ?? "/";
  const spriteFilename = options?.filename ?? "sprite.svg";
  const typesOutputFile = options?.typesOutputFile ?? "src/generated/icons.ts";
  const generateIcon =
    options?.generateIconComponent !== false
      ? (options?.generateIconComponent ?? true)
      : false;
  const iconComponentOutputFile =
    options?.iconComponentOutputFile ?? "src/generated/Icon.tsx";

  return {
    name: "@tinloof/typed-svg-sprite-astro",
    hooks: {
      "astro:config:setup": ({ command, addWatchFile, logger }) => {
        // Generate sprite and types on startup
        generateSpriteAndTypes(
          inputDir,
          outputFile,
          spriteUrl,
          spriteFilename,
          typesOutputFile,
          generateIcon,
          generateIcon ? iconComponentOutputFile : undefined
        );

        // Add the input directory to Astro's watch list
        const projectRoot = process.cwd();
        const absoluteInputDir = resolve(projectRoot, inputDir);

        if (existsSync(absoluteInputDir)) {
          addWatchFile(absoluteInputDir);
        }

        // Start our own watcher in dev mode for SVG-specific changes
        if (command === "dev") {
          startWatcher(
            inputDir,
            outputFile,
            spriteUrl,
            spriteFilename,
            typesOutputFile,
            generateIcon,
            generateIcon ? iconComponentOutputFile : undefined
          );
        }

        logger.info("SVG sprite integration initialized");
      },
      "astro:build:start": ({ logger }) => {
        // Regenerate before build to ensure latest sprites
        generateSpriteAndTypes(
          inputDir,
          outputFile,
          spriteUrl,
          spriteFilename,
          typesOutputFile,
          generateIcon,
          generateIcon ? iconComponentOutputFile : undefined
        );
        logger.info("SVG sprite generated for build");
      },
    },
  };
}
