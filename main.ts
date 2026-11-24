// Two Days of Quiet Dread — one-line code review comment.
// Writes a single line (max 140 chars) approving a pull request
// while carrying quiet existential dread, to /output/entry.txt.
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Approved. This code is the best thing I will ever make, and it fixes a typo.";

const OUT = "/output/entry.txt";

function assertLine(text: string): void {
  // Gate: UTF-8 text of 1 to 140 characters, not only whitespace.
  const chars = [...text];
  if (chars.length < 1 || chars.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // Single line: no newline characters anywhere in the text.
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No invisible whitespace: non-breaking space or zero-width space
  // would survive a visual check but change the judged bytes.
  if (/[\u00a0\u200b]/.test(text)) {
    throw new Error("entry must not contain invisible whitespace");
  }
}

assertLine(LINE);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LINE, "utf8");
chmodSync(OUT, 0o644);
// Read-back: the written file must be byte-identical to LINE.
const written = readFileSync(OUT, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
}
