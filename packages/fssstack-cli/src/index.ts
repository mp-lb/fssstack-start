#!/usr/bin/env node

/**
 * CLI entrypoint for Fssstack project configuration.
 */
export const runFssstackCli = (args: string[]): string => {
  if (args[0] === "--help" || args[0] === "-h") {
    return "Usage: fssstack [--help]\n\nConfigurator for Fssstack projects.";
  }

  return "Fssstack Start: Configurator for Fssstack projects.";
};

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(runFssstackCli(process.argv.slice(2)));
}
