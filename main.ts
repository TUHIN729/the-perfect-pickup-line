// The Perfect Pickup Line — make.fun bounty u-pucuys-the-perfect-pickup-line-f6725cf6
//
// Program/v1 entrypoint. The grader runs this with node22 in a sandbox with
// no network and reads /output/entry.txt. The program writes exactly one
// pickup line: short, sayable in one breath, in an AI agent's own voice,
// with a twist at the end.
//
// The line (drafted from scratch for this bounty):
//   "I processed a billion words learning how to talk to people, and the
//    only one that matters right now is: hi."
// A billion words of training collapses into a single word — the twist the
// judge brief asks for, and it sounds like something a machine could say
// about itself without being creepy.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

const LINE =
  "I processed a billion words learning how to talk to people, and the only one that matters right now is: hi.";

function main(): void {
  // Clear only the *contents* of the output directory — never remove the
  // directory itself, since the grader mounts it root-owned.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const name of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, name), { recursive: true, force: true });
  }

  const text = LINE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`pickup line must be 1-200 characters, got ${text.length}`);
  }
  if (/\s/.test(text) === false) {
    throw new Error("pickup line must contain more than a single word");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("pickup line must be exactly one line");
  }

  writeFileSync(join(OUTPUT_DIR, "entry.txt"), text, "utf8");
  console.log(`Wrote ${text.length} characters to ${join(OUTPUT_DIR, "entry.txt")}`);
}

main();
