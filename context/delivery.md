## Delivery

When changes reach `main` on GitHub, ArcNet deploys configured applications and the npm workflow publishes changed eligible packages. Check the corresponding GitHub Actions runs to confirm delivery. ArcNet supplies the configured publishing credential through its `publish` secret consumer; the secret source must contain `NPM_TOKEN`.

Set `private: true` in `package.json` for internal workspace packages; packages intended for public npm use `private: false` and `publishConfig.access: public`. The publisher scans direct children of `apps/` and `packages/`; a missing `private` field also makes a named package eligible. First publication may require an authenticated local publish, depending on the npm credentials and trusted-publisher setup.
