# @mp-lb/fssstack-cli

The `fssstack` command validates Fssstack configuration JSON and generates
the corresponding setup prompt.

```sh
fssstack schema > schema.json
fssstack prompt < project.json > prompt.md
```

Pass JSON directly when preferred:

```sh
fssstack prompt '{"description":"My app","githubRepository":"owner/repository"}'
```

`fssstack schema` prints a draft-2020-12 JSON Schema. `fssstack prompt`
accepts the same configuration shape and defaults as the web configurator,
then writes the generated setup prompt to stdout. Validation errors are
written to stderr with a non-zero exit code.

`description` and `githubRepository` are required. Set `githubRepository` to
the target `owner/repository`; setup uses it to template the release workflow.

Use `fssstack --help` for command details and `fssstack --version` to print
the installed package version.
