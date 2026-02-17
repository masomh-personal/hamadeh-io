#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";

const nextBuildDir = ".next";

console.log("🧹 Resetting Next.js cache...\n");

if (!existsSync(nextBuildDir)) {
    console.log("⏭️  Skipped: .next (not found)");
    process.exit(0);
}

try {
    await rm(nextBuildDir, { recursive: true, force: true });
    console.log("✅ Removed: .next");
    console.log("✅ Next.js cache reset complete.");
} catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to remove .next:", message);
    process.exit(1);
}
