#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { analyze } from "./analyzer.js";
const args = process.argv.slice(2);
if (args.length < 2 || args[0] !== "analyze") {
    console.log("Usage: ctxopt analyze <file.json>");
    process.exit(1);
}
const filePath = path.resolve(args[1]);
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}
try {
    const content = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(content);
    const result = analyze(data);
    console.log("\nCTXOPT");
    console.log("────────────────────────");
    console.log(`File: ${filePath}\n`);
    console.log("JSON");
    console.log(`  Size:   ${result.json.bytes} bytes`);
    console.log(`  Tokens: ~${result.json.estimatedTokens}`);
    console.log("\nTOON");
    console.log(`  Size:   ${result.toon.bytes} bytes`);
    console.log(`  Tokens: ~${result.toon.estimatedTokens}`);
    console.log(`\nToken savings: ${result.tokenSavingsPercent.toFixed(1)}%`);
    console.log(`Byte savings: ${result.byteSavingsPercent.toFixed(1)}%`);
}
catch (error) {
    console.error("Failed to analyze file.");
    if (error instanceof Error) {
        console.error(error.message);
    }
    process.exit(1);
}
