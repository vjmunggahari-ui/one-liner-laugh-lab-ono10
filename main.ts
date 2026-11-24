// One-Liner Laugh Lab entry: the excuse a robot vacuum gives after eating a sock.
// Writes exactly one line (no trailing newline) to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I ate your sock, then adopted it. It lives in my dustbin now and pays rent in lint.";

function main(): void {
  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  // Read-back self-check: 1-200 chars, single line, no trailing newline, non-whitespace.
  const back = readFileSync(outPath, "utf8");
  if (back !== ENTRY) throw new Error("read-back mismatch");
  if (back.length < 1 || back.length > 200) {
    throw new Error(`entry length ${back.length} outside 1-200`);
  }
  if (back.trim().length === 0) throw new Error("entry is only whitespace");
  if (back.endsWith("\n")) throw new Error("entry has a trailing newline");
  if (back.includes("\n")) throw new Error("entry is not one line");
  if (/\s$/.test(back)) throw new Error("entry ends with whitespace");
  // Content guard: the excuse must name the sock and the eating, per the prompt.
  if (!back.includes("sock")) throw new Error("entry does not name the sock");
  if (!back.includes("ate")) throw new Error("entry does not admit the eating");
  console.log(`entry.txt written (${back.length} chars)`);
}

main();
