import { createHash } from "node:crypto";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";

const SRC = "src";
const DIST = "dist";
const STYLESHEET = "styles.css";
const HASHED = new Set([".png", ".svg", ".webp", ".avif", ".ico", ".woff2"]);
const REWRITTEN = new Set([".html", ".css", ".xml", ".txt", ".json"]);
const LINK = new RegExp(`^[ \\t]*<link rel="stylesheet" href="/${STYLESHEET}"\\s*/?>\\r?\\n`, "m");

async function walk(dir) {
  const entries = await readdir(join(SRC, dir), { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

function rewrite(text, renames) {
  for (const [from, to] of renames) text = text.replaceAll(from, to);
  return text;
}

async function emit(path, contents) {
  await mkdir(dirname(join(DIST, path)), { recursive: true });
  await writeFile(join(DIST, path), contents);
}

await rm(DIST, { recursive: true, force: true });

const files = await walk("");
const renames = new Map();

const assets = files.filter((path) => HASHED.has(extname(path)));

for (const path of assets.sort((a, b) => b.length - a.length)) {
  const buffer = await readFile(join(SRC, path));
  const ext = extname(path);
  const hash = createHash("sha256").update(buffer).digest("hex").slice(0, 8);
  const name = `${path.slice(0, -ext.length)}.${hash}${ext}`;
  renames.set(`/${path}`, `/${name}`);
  await emit(name, buffer);
}

const style = rewrite(await readFile(join(SRC, STYLESHEET), "utf8"), renames).trim();

for (const path of files) {
  const ext = extname(path);
  if (HASHED.has(ext) || path === STYLESHEET) continue;

  if (!REWRITTEN.has(ext)) {
    await mkdir(dirname(join(DIST, path)), { recursive: true });
    await cp(join(SRC, path), join(DIST, path));
    continue;
  }

  let text = rewrite(await readFile(join(SRC, path), "utf8"), renames);
  if (ext === ".html") {
    if (!LINK.test(text)) throw new Error(`${path}: no <link> to /${STYLESHEET}`);
    text = text.replace(LINK, `    <style>\n${style}\n    </style>\n`);
  }
  await emit(path, text);
}

console.log(`${DIST}: ${files.length - 1} files, ${renames.size} hashed, ${STYLESHEET} inlined`);
