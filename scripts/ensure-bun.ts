#!/usr/bin/env bun

const userAgent = process.env.npm_config_user_agent ?? "";

if (!userAgent.startsWith("bun/")) {
    console.error("This project uses Bun exclusively. Run `bun install`.");
    process.exit(1);
}
