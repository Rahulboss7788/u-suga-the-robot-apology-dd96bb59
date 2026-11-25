import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const text =
  "I'm sorry — I watered the fern by the window instead of the basil on the counter, and left the basil thirsty while the fern sat in a puddle.\n" +
  "I've learned to read the plant tag before I pour, so now I check the label first and water only the plant it names.";

if (text.length < 1 || text.length > 400 || text.trim().length === 0) {
  throw new Error(`entry out of gate: ${text.length} characters`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");

// Read back and verify: the file must hold exactly this text, within the gate.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== text) {
  throw new Error("read-back mismatch: /output/entry.txt does not hold exactly the entry text");
}
if (back.length < 1 || back.length > 400 || back.trim().length === 0) {
  throw new Error(`entry out of gate on read-back: ${back.length} characters`);
}
if (back.split("\n").length !== 2) {
  throw new Error("entry must be exactly two lines separated by a single newline");
}
console.log(`wrote /output/entry.txt (${text.length} characters)`);
