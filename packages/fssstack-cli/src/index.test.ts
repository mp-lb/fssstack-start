import { describe, expect, it } from "vitest";

import { runFssstackCli } from ".";

describe("fssstack cli", () => {
  it("prints the shared JSON Schema", () => {
    const schema = JSON.parse(runFssstackCli(["schema"]));

    expect(schema.$schema).toBe("https://json-schema.org/draft/2020-12/schema");
    expect(schema.properties.extensions.items.enum).toContain("electron");
  });

  it("renders the shared setup prompt from an argument", () => {
    expect(runFssstackCli(["prompt", '{"description":"My app"}'])).toContain(
      'description: "My app"',
    );
  });

  it("renders the shared setup prompt from stdin", () => {
    expect(runFssstackCli(["prompt"], '{"description":"My app"}')).toContain(
      "To start setup:",
    );
  });

  it("reports invalid JSON", () => {
    expect(() => runFssstackCli(["prompt"], "{")).toThrow("Invalid JSON");
  });

  it("prints help and version information", () => {
    expect(runFssstackCli([])).toContain("fssstack prompt [JSON]");
    expect(runFssstackCli(["--version"])).toBe("0.0.1\n");
  });
});
