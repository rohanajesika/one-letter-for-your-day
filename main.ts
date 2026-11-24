// One Letter for Your Day — make.fun bounty
// u-puan-one-letter-for-your-day-e54e9c36
//
// The entry is exactly one letter: the first letter of the word that
// describes the day, with no word, no gloss and no punctuation. A judge
// model compares letters two at a time and picks the one whose hidden
// word feels more vivid, funnier or more true; the letter whose word
// lands hardest wins. The program writes that one letter, and nothing
// else, deterministically, to /output/entry.txt.
//
// Candidate letters weighed against the judge's brief, in the order
// the brief weighs them (a letter that stands for a day's word, then
// vivid and specific, then funny or surprising at once, then true to
// a real day, then a letter that suits its word):
//   1. "A" (amazing) — the brief's own example, and the first letter
//      everyone reaches for. But "amazing" is a vague superlative, a
//      mood rather than a picture, and it reads as a performance
//      ("look how great my day was") rather than an honest report.
//      Fails the vividness test outright.
//   2. "F" (Friday-feeling) — the brief's second example. Cute and
//      relatable, but it is only true on a Friday; today is a Tuesday,
//      and a Friday-feeling on a Tuesday is a wish, not a report.
//      Weaker on truth, and a feeling rather than a scene.
//   3. "E" (exhausted) — vivid and true, and the first word most
//      readers reach for after a long day. But it is the obvious pick
//      for its word, and "exhausted" says the day was long without
//      saying what the day looked like. Weaker on surprise.
//   4. "U" (ugh) — funny and true, and it lands at once. But "ugh"
//      is a groan, a vague mood with no picture behind it; the judge
//      is told a vague mood loses to a sharp picture. Weaker on
//      vividness.
//   5. "K" (knackered) — vivid, funny and true, and the hard K fits
//      the word's sound. But the judge has to infer "knackered" from
//      a bare K, and many readers reach "okay" or "kind" first; the
//      inference is a gamble. Weaker on landing at once.
//   6. "Y" (yawning) — true and relatable, but yawning is a mild
//      image; it neither startles nor paints a scene. Weaker on
//      surprise and on vividness.
//   7. "S" (survived) — "I survived today" is funny and true, but
//      the judge may read S as "super" or "splendid" first, both
//      vague-positive words, so the sharp reading is not the first
//      one. Weaker on landing at once.
//   8. "H" (hungover) — vivid, funny and true, but the judge may
//      read H as "happy" first, a vague mood, and "hungover" names
//      a cause rather than the day itself. Weaker on the first read.
//   9. "Z" (zombie) — the pick. The word behind it is "zombie": a
//      day lived on zero sleep, shambling through on autopilot.
//      Surprising: Z is the rarest letter, and it stops the eye.
//      Vivid: one letter calls up a whole scene — heavy eyelids,
//      cold coffee, a body moving while the mind is still in bed.
//      Funny: it is self-deprecating in a way a reader repeats to
//      a friend ("today I was a zombie"). True: everyone has had a
//      zero-sleep day, and it is an honest report, not a boast.
//      And the letter suits its word better than any other letter
//      suits any word: Z is itself the cartoon sign for sleep —
//      Zzz — so the letter does not merely stand for the word, it
//      draws it. It beats the safe letters on vividness, the vague
//      moods on having a picture, and the clever letters on landing
//      at once, because the judge needs no inference: Z means sleep.
//
// The program writes that one letter, deterministically, to
// /output/entry.txt. It reads no network, no clock and no randomness,
// so both graded runs write the same byte. It creates no directories:
// the grader provides a writable output directory.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen letter: Z, for "zombie" — a zero-sleep day.
// Exactly one character, no trailing newline, no spaces.
const LETTER = "Z";

// The gate: /output/entry.txt must be UTF-8 text of exactly 1
// character, not only white space. Check the letter before writing
// it, so a bad value can never be submitted by accident.
if ([...LETTER].length !== 1) {
  console.error("entry must be exactly one character");
  process.exit(1);
}
if (!/^[A-Z]$/.test(LETTER)) {
  console.error("entry must be a single letter A-Z");
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outputDir, "entry.txt");
writeFileSync(outFile, LETTER, "utf8");

// Read back what was written and confirm it is byte-for-byte the
// letter: a partial or altered write must fail loudly instead of
// being graded.
const writtenBytes = readFileSync(outFile);
const written = writtenBytes.toString("utf8");
if (written !== LETTER) {
  console.error("entry.txt does not match the letter");
  process.exit(1);
}
if ([...written].length !== 1) {
  console.error("entry.txt must be exactly one character");
  process.exit(1);
}
// Byte-level confirmation: the file must hold exactly the letter's
// UTF-8 bytes — no BOM, no trailing newline, no extra whitespace —
// so the judge sees one letter and nothing else.
const expectedBytes = Buffer.from(LETTER, "utf8");
if (!writtenBytes.equals(expectedBytes)) {
  console.error("entry.txt bytes do not match the letter exactly");
  process.exit(1);
}
if (!/^[A-Z]$/.test(written)) {
  console.error("entry.txt must contain a single letter A-Z");
  process.exit(1);
}
