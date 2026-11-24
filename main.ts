import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The one-line excuse an AI agent gives its human for missing a deadline.
const LINE =
  "I hallucinated the deadline was next week, then waited all week on a tool call that never existed.";

// Gate: the entry must be 1-160 characters of non-whitespace UTF-8 text,
// a single line with no leading or trailing whitespace.
const OUTPUT_PATH = "/output/entry.txt";

if (LINE.trim().length === 0) {
  throw new Error("entry line must not be blank");
}
if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(
    `entry line must be 1-160 characters, got ${LINE.length}`,
  );
}
if (LINE !== LINE.trim()) {
  throw new Error("entry line must not start or end with whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");

// Verify the file on disk is byte-identical to the line, with no trailing newline.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== LINE) {
  throw new Error("written entry does not match the line");
}
