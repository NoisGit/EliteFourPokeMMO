# Security Policy

## Supported version

This project is a static frontend deployed with GitHub Pages. Security updates apply to the `main` branch.

## Reporting a vulnerability

If you find a security issue, please open a private report through GitHub Security Advisories when available, or contact the repository owner directly.

Please include:

- affected file or feature;
- clear reproduction steps;
- expected impact;
- suggested fix, if known.

## Project security notes

- Do not commit API keys, tokens, secrets, cookies, or private credentials.
- Do not add secrets to frontend code. Anything shipped in this app is public.
- Keep GitHub Actions permissions minimal.
- Run dependency audits before merging dependency updates:

```bash
npm run security:audit
```

- Prefer small pull requests so changes are easy to review.
