# Playwright QA Showcase

Public Playwright TypeScript E2E and quality guardrail test suite verifying [Jeff Marck's portfolio](https://jeffmarck-resume.pages.dev) across desktop and mobile viewports.

## What It Tests
- Hero rendering, WebP portrait loading (`naturalWidth > 0`), and `JSON-LD` `Person` schema
- Privacy guardrails (asserting zero personal email addresses or mobile numbers appear in the DOM)
- Theme toggle persistence (`localStorage`)
- Interactive QA Lab self-audit & resilient Playwright locator comparison

## Run Locally
```bash
npm install
npx playwright install chromium
npm test
```
