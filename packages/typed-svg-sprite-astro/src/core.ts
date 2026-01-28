import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { load } from "cheerio";
import { globSync } from "glob";

const SVG_EXT_REGEX = /\.svg$/;
const PATH_SEP_REGEX = /[/\\]/g;
const INVALID_CHAR_REGEX = /[^a-zA-Z0-9-_]/g;
const MULTI_DASH_REGEX = /--+/g;
const EDGE_DASH_REGEX = /^-+|-+$/g;
const COMMENT_REGEX = /<!--[\s\S]*?-->/g;
const WHITESPACE_BETWEEN_REGEX = />\s+</g;
const TRAILING_ZEROS_REGEX = /(\d+\.\d*?)0+(?=\D)/g;
const DECIMAL_ZEROS_REGEX = /(\d+)\.0+(?=\D)/g;
const MULTI_SPACE_REGEX = /\s+/g;
const ATTR_SPACE_REGEX = /\s*=\s*/g;

export interface SvgSymbol {
  id: string;
  originalId: string;
  viewBox: string;
  content: string;
  attributes: Record<string, string>;
}

export interface SpriteGenerationOptions {
  inputDir: string;
  outputFile: string;
  verbose?: boolean;
  minify?: boolean;
  optimize?: boolean;
}

export function generateSymbolIdFromPath(
  filePath: string,
  baseDir: string
): string {
  const relativePath = relative(baseDir, filePath);
  const pathWithoutExt = relativePath.replace(SVG_EXT_REGEX, "");

  const symbolId = pathWithoutExt
    .replace(PATH_SEP_REGEX, "-")
    .replace(INVALID_CHAR_REGEX, "-")
    .replace(MULTI_DASH_REGEX, "-")
    .replace(EDGE_DASH_REGEX, "");

  return symbolId;
}

function generateShortId(index: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const maxIndex = chars.length;
  let id = "";
  let num = index;

  do {
    id = chars[num % maxIndex] + id;
    num = Math.floor(num / maxIndex);
  } while (num > 0);

  return id;
}

function optimizeSvgContent(content: string): string {
  return content
    .replace(COMMENT_REGEX, "")
    .replace(WHITESPACE_BETWEEN_REGEX, "><")
    .replace(TRAILING_ZEROS_REGEX, "$1")
    .replace(DECIMAL_ZEROS_REGEX, "$1")
    .replace(MULTI_SPACE_REGEX, " ")
    .replace(ATTR_SPACE_REGEX, "=")
    .trim();
}

export function parseSvgFile(
  svgContent: string,
  originalId: string,
  shortId: string,
  shouldOptimize = true
): SvgSymbol {
  const processedContent = shouldOptimize
    ? optimizeSvgContent(svgContent)
    : svgContent;

  const $ = load(processedContent, { xmlMode: true });
  const $svg = $("svg").first();

  if ($svg.length === 0) {
    throw new Error("Invalid SVG content");
  }

  let viewBox = $svg.attr("viewBox");
  if (!viewBox) {
    const width = $svg.attr("width") || "24";
    const height = $svg.attr("height") || "24";
    viewBox = `0 0 ${width} ${height}`;
  }

  const attributes: Record<string, string> = {};
  const svgAttribs = $svg.get(0)?.attribs || {};

  const excludeAttribs = new Set([
    "viewBox",
    "width",
    "height",
    "xmlns",
    "xmlns:xlink",
  ]);

  for (const [key, value] of Object.entries(svgAttribs)) {
    if (!excludeAttribs.has(key) && value) {
      attributes[key] = value;
    }
  }

  return {
    id: shortId,
    originalId,
    viewBox,
    content: $svg.html() || "",
    attributes,
  };
}

export function generateSpriteSvg(symbols: SvgSymbol[], minify = true): string {
  if (symbols.length === 0) {
    return minify
      ? '<svg xmlns="http://www.w3.org/2000/svg" style="display:none"></svg>'
      : `<svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite" style="display: none;">
</svg>`;
  }

  const symbolElements = symbols
    .map((symbol) => {
      let attributesStr = "";
      for (const [key, value] of Object.entries(symbol.attributes)) {
        attributesStr += ` ${key}="${value}"`;
      }

      return `<symbol id="${symbol.id}" viewBox="${symbol.viewBox}"${attributesStr}>${symbol.content}</symbol>`;
    })
    .join(minify ? "" : "\n  ");

  if (minify) {
    return `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbolElements}</svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" class="svg-sprite" style="display: none;">
  ${symbolElements}
</svg>`;
}

export function findAndParseSvgFiles(
  inputDir: string,
  verbose = true,
  optimize = true
): SvgSymbol[] {
  const absoluteInputDir = resolve(process.cwd(), inputDir);

  if (!existsSync(absoluteInputDir)) {
    if (verbose) {
      console.warn(`[svg-sprite] Input directory not found: ${inputDir}`);
    }
    return [];
  }

  const svgFiles = globSync("**/*.svg", {
    cwd: absoluteInputDir,
    absolute: true,
  });

  if (svgFiles.length === 0) {
    if (verbose) {
      console.warn(`[svg-sprite] No SVG files found in ${inputDir}`);
    }
    return [];
  }

  if (verbose) {
    console.log(
      `[svg-sprite] Found ${svgFiles.length} SVG files in ${inputDir}`
    );
  }

  const symbols: SvgSymbol[] = [];
  for (let i = 0; i < svgFiles.length; i++) {
    const svgFile = svgFiles[i];
    try {
      const content = readFileSync(svgFile, "utf8");
      const originalId = generateSymbolIdFromPath(svgFile, absoluteInputDir);
      const shortId = generateShortId(i);
      const symbol = parseSvgFile(content, originalId, shortId, optimize);
      symbols.push(symbol);
    } catch (error) {
      if (verbose) {
        console.error(`[svg-sprite] Error parsing ${svgFile}:`, error);
      }
    }
  }

  return symbols;
}

export function generateSprite(options: SpriteGenerationOptions): SvgSymbol[] {
  const {
    inputDir,
    outputFile,
    verbose = true,
    minify = true,
    optimize = true,
  } = options;

  try {
    const projectRoot = process.cwd();
    const absoluteOutputFile = resolve(projectRoot, outputFile);

    const symbols = findAndParseSvgFiles(inputDir, verbose, optimize);

    if (symbols.length === 0) {
      return symbols;
    }

    let spriteContent = generateSpriteSvg(symbols, minify);

    if (optimize) {
      spriteContent = optimizeSvgContent(spriteContent);
    }

    const outputDir = dirname(absoluteOutputFile);
    mkdirSync(outputDir, { recursive: true });
    writeFileSync(absoluteOutputFile, spriteContent, "utf8");

    if (verbose) {
      const sizeKB = (Buffer.byteLength(spriteContent, "utf8") / 1024).toFixed(
        2
      );
      console.log(
        `[svg-sprite] Generated sprite with ${symbols.length} symbols (${sizeKB} KB) -> ${outputFile}`
      );
    }

    return symbols;
  } catch (error) {
    if (verbose) {
      console.error("[svg-sprite] Error generating sprite:", error);
    }
    throw error;
  }
}
