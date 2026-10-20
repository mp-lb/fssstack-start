import { describe, expect, it } from "vitest";
import { runFssstackCli } from ".";

describe("fssstack cli", () => {
  it("prints its purpose", () => {
    expect(runFssstackCli([])).toBe(
      "Fssstack Start: Configurator for Fssstack projects.",
    );
  });

  it("prints help", () => {
    expect(runFssstackCli(["--help"])).toContain("Usage: fssstack");
  });
});
