import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const scheme of ["dark", "light"] as const) {
  test(`no axe violations in ${scheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("every interactive element is reachable by Tab with a visible focus ring", async ({ page }) => {
  await page.goto("/");
  const total = await page.locator("a[href], button, [tabindex='0']").count();
  expect(total).toBeGreaterThan(0);
  for (let i = 0; i < total; i++) {
    await page.keyboard.press("Tab");
    const ring = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement as Element);
      return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
    });
    expect(ring.style).not.toBe("none");
    expect(ring.width).toBeGreaterThanOrEqual(3);
  }
});

test("focus ring survives forced colors", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /switch to/i });
  await toggle.focus();
  const style = await toggle.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(style).not.toBe("none");
});

test("no animation or transition anywhere", async ({ page }) => {
  await page.goto("/");
  const moving = await page.evaluate(() =>
    [...document.querySelectorAll("*")].filter((el) => {
      const style = getComputedStyle(el);
      return style.animationName !== "none" || style.transitionDuration !== "0s";
    }).length,
  );
  expect(moving).toBe(0);
});

test("text spacing override does not clip", async ({ page }) => {
  await page.goto("/");
  await page.addStyleTag({
    content: `* {
      line-height: 1.5 !important;
      letter-spacing: 0.12em !important;
      word-spacing: 0.16em !important;
    }
    p { margin-bottom: 2em !important; }`,
  });
  const clipped = await page.evaluate(() =>
    [...document.querySelectorAll("p, li, td, a, button")]
      .filter((el) => el.scrollHeight > el.clientHeight + 1)
      .map((el) => el.textContent?.slice(0, 40)),
  );
  expect(clipped).toEqual([]);
});

test("reflows at 320px and at 200% zoom", async ({ page }) => {
  for (const [width, zoom] of [
    [320, 1],
    [640, 2],
  ]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    await page.evaluate((z) => {
      document.documentElement.style.zoom = String(z);
    }, zoom);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${width}px at zoom ${zoom}`).toBeLessThanOrEqual(0);
  }
});

test("all text meets 7:1 contrast", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2aaa"])
    .withRules(["color-contrast-enhanced"])
    .analyze();
  expect(results.violations).toEqual([]);
});
