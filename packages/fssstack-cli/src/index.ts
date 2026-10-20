#!/usr/bin/env node

/* eslint-disable import/extensions -- emitted Node ESM imports require .js */

import { readFileSync } from "node:fs";

import {
  normalizeProjectPromptConfig,
  projectPromptJsonSchema,
  projectPromptSchema,
} from "./project-schema.js";
import { buildPrompt } from "./project-prompt.js";

const packageMetadata = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { version: string };

const help = `Usage:
  fssstack schema          Print the JSON Schema
  fssstack prompt [JSON]   Validate JSON and print the setup prompt

With no JSON argument, prompt reads JSON from stdin:
  fssstack schema > schema.json
  fssstack prompt < project.json > prompt.md
  fssstack prompt '{"description":"My app"}'

Copy JSON from the website's JSON tab. Defaults and prompt text are shared
with the web app. Output goes to stdout; validation errors go to stderr.
App and library slugs must be unique across all lists (checked by Zod).
  --help, -h              Show help
  --version, -v           Show version
`;

export const runFssstackCli = (args: string[], stdin?: string): string => {
  const [command, ...commandArgs] = args;

  if (!command || command === "--help" || command === "-h") {
    return help;
  }

  if (command === "--version" || command === "-v") {
    return `${packageMetadata.version}\n`;
  }

  if (command === "schema" && commandArgs.length === 0) {
    return `${JSON.stringify(projectPromptJsonSchema(), null, 2)}\n`;
  }

  if (command !== "prompt" || commandArgs.length > 1) {
    throw new Error(
      "Use 'fssstack schema' or 'fssstack prompt [JSON]'. See --help.",
    );
  }

  const input = commandArgs[0] ?? stdin;

  if (input === undefined) {
    throw new Error("Provide a JSON argument or pipe JSON to stdin.");
  }

  let value: unknown;

  try {
    value = JSON.parse(input);
  } catch {
    throw new Error(
      "Invalid JSON. Pass a JSON object or pipe a JSON file to stdin.",
    );
  }

  const result = projectPromptSchema.safeParse(value);

  if (!result.success) {
    throw new Error(
      result.error.issues
        .map((issue) => `${issue.path.join(".") || "config"}: ${issue.message}`)
        .join("\n"),
    );
  }

  return `${buildPrompt(normalizeProjectPromptConfig(result.data))}\n`;
};

const readStdin = async () => {
  process.stdin.setEncoding("utf8");
  let input = "";

  for await (const chunk of process.stdin) {
    input += chunk;
  }

  return input;
};

const main = async () => {
  const args = process.argv.slice(2);

  const stdin =
    args[0] === "prompt" && args.length === 1 && !process.stdin.isTTY
      ? await readStdin()
      : undefined;

  try {
    process.stdout.write(runFssstackCli(args, stdin));
  } catch (error) {
    process.stderr.write(
      `fssstack: ${error instanceof Error ? error.message : String(error)}\n`,
    );

    process.exitCode = 1;
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
