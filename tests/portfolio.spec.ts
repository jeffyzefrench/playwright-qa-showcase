import { expect, test } from '@playwright/test';

test.describe('Portfolio Quality & Privacy Guardrails', () => {
  test('renders hero, portrait, and valid SEO structured data', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1, name: /Jeff Marck/i })).toBeVisible();

    const portrait = page.getByRole('img', { name: /Jeff Marck/i });
    await expect(portrait).toBeVisible();
    const naturalWidth = await portrait.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toBeTruthy();
    const schema = JSON.parse(jsonLd!);
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe('Jeff Marck');
  });

  test('never exposes personal email or mobile phone in public DOM', async ({ page }) => {
    await page.goto('/');
    const text = await page.locator('body').innerText();

    expect(text).not.toMatch(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    expect(text).not.toMatch(/\b04\d{2}[\s-]?\d{3}[\s-]?\d{3}\b/);
  });

  test('persists dark/light theme toggle across reloads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.getByRole('button', { name: 'Toggle color theme' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('interactive QA Lab self-audit and locator resilience demo pass', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Run audit/i }).click();
    await expect(page.locator('#audit-results')).toContainText('4/4 specs passed');
    await expect(page.locator('#audit-results')).not.toContainText('FAIL');

    await page.getByRole('button', { name: 'Refactor DOM' }).click();
    await page.getByRole('button', { name: /Run test/i }).click();
    await expect(page.locator('#locator-results')).toContainText('FAIL');
    await expect(page.locator('#locator-results')).toContainText('PASS');
  });
});
