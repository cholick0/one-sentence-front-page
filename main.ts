import { mkdirSync, writeFileSync } from "node:fs";

// One Sentence, One Front Page — the front-page headline that sums up
// today's world news (Monday 23 November 2026).
//
// The day's lead story: Russian strikes on the Kyiv region killed at
// least 15 people, with a drone strike partially destroying an apartment
// building in Dymer, near Kyiv, leaving 14 people missing under the
// rubble as rescuers dug through it; the war is entering its fifth
// winter. The headline names the event, the number, and the place, and
// carries enough detail to stand alone on a front page.
const ENTRY =
  "Russian strikes kill at least 15 around Kyiv, burying residents under a ruined apartment block in Dymer as the war enters its fifth winter.";

mkdirSync("/output", { recursive: true });

// Self-check the gate before writing: the entry must be UTF-8 text of
// 1 to 200 characters, not only white space, and a single sentence.
const trimmed = ENTRY.trim();
if (trimmed.length < 1 || trimmed.length > 200) {
  throw new Error(`entry is ${trimmed.length} characters, outside the 1-200 gate`);
}
const sentenceEnds = (trimmed.match(/[.!?]/g) ?? []).length;
if (sentenceEnds !== 1 || !trimmed.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending in a period");
}
writeFileSync("/output/entry.txt", trimmed + "\n", "utf8");
console.log(`wrote ${trimmed.length} characters to /output/entry.txt`);
