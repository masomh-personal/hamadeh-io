#!/usr/bin/env bun

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";

const filesToRemove = [
    "node_modules",
    ".next",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
];

console.log("🧹 Cleaning project...\n");

for (const file of filesToRemove) {
    if (existsSync(file)) {
        try {
            await rm(file, { recursive: true, force: true });
            console.log(`✅ Removed: ${file}`);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : String(error);
            console.error(`❌ Failed to remove ${file}:`, message);
        }
    } else {
        console.log(`⏭️  Skipped: ${file} (not found)`);
    }
}

console.log("\n📦 Reinstalling packages...\n");
try {
    execFileSync(process.execPath, ["install"], { stdio: "inherit" });
    console.log("\n✅ Clean install complete!");
} catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("\n❌ Failed to install packages:", message);
    process.exit(1);
}
