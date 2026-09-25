#!/usr/bin/env bun

/**
 * Cursor beforeShellExecution hook
 *
 * Denies agent shell commands that launch Bun without the `env` prefix. Bare
 * `bun` started from an editor shell can receive the editor's binary as
 * argv[0], which Bun then writes into the shim directory it shares across the
 * machine. See the Tooling section of .cursor/rules/core-standards.mdc.
 *
 * Registered in .cursor/hooks.json. Remove both once Bun resolves the shim
 * target from the executable path rather than argv[0].
 */

const QUOTED_STRING = /"(?:[^"\\]|\\.)*"|'[^']*'/g;
const SEGMENT_SEPARATOR = /&&|\|\||[;|&\n(`]/;
const ENV_ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=\S*$/;
const BUN_EXECUTABLE = /^(?:\S*\/)?bunx?$/;

interface HookResponse {
    permission: "allow" | "deny";
    user_message?: string;
    agent_message?: string;
}

/**
 * Reports whether any command segment runs `bun` or `bunx` directly.
 * Quoted text is ignored so arguments like commit messages never match.
 */
export function needsEnvPrefix(command: string): boolean {
    const unquoted = command.replace(QUOTED_STRING, '""');

    return unquoted.split(SEGMENT_SEPARATOR).some((segment) => {
        const words = segment.trim().split(/\s+/);
        const executable = words.find((word) => !ENV_ASSIGNMENT.test(word));

        return executable !== undefined && BUN_EXECUTABLE.test(executable);
    });
}

function readCommand(input: unknown): string {
    if (typeof input !== "object" || input === null) {
        return "";
    }

    const { command } = input as { command?: unknown };
    return typeof command === "string" ? command : "";
}

async function main(): Promise<void> {
    let command = "";

    try {
        command = readCommand(await Bun.stdin.json());
    } catch {
        // Unreadable input is not ours to police; let Cursor's own checks run.
    }

    const response: HookResponse = needsEnvPrefix(command)
        ? {
              permission: "deny",
              user_message:
                  "Blocked a bare `bun` command; the agent will retry with `env bun`.",
              agent_message:
                  "This repo requires Bun to be invoked through env (for example `env bun run healthcheck`) so Bun's shared shims are not corrupted. Re-run the same command with every `bun` or `bunx` prefixed by `env`.",
          }
        : { permission: "allow" };

    console.log(JSON.stringify(response));
}

if (import.meta.main) {
    await main();
}
