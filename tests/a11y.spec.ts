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
  let previous: string | null = null;
  for (let i = 0; i < total; i++) {
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const style = getComputedStyle(el);
      const header = document.querySelector(".site-header")!;
      return {
        id: `${el.tagName}:${el.textContent}:${el.getAttribute("href")}:${el.getAttribute("aria-label")}`,
        outlineStyle: style.outlineStyle,
        outlineWidth: parseFloat(style.outlineWidth),
        coversHeader: header.contains(el) || el.classList.contains("skip-link"),
        top: el.getBoundingClientRect().top,
        headerBottom: header.getBoundingClientRect().bottom,
      };
    });
    expect(focused.id, `Tab press ${i + 1} moved focus`).not.toBe(previous);
    previous = focused.id;
    expect(focused.outlineStyle).not.toBe("none");
    expect(focused.outlineWidth).toBeGreaterThanOrEqual(3);
    if (!focused.coversHeader) {
      expect(focused.top, focused.id).toBeGreaterThanOrEqual(focused.headerBottom);
    }
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

for (const width of [320, 1280]) {
  test(`text spacing override does not clip or overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    await page.addStyleTag({
      content: `* {
        line-height: 1.5 !important;
        letter-spacing: 0.12em !important;
        word-spacing: 0.16em !important;
      }
      p { margin-bottom: 2em !important; }`,
    });
    const result = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        clipped: [...document.querySelectorAll("p, li, td, a, button")]
          .filter((el) => el.scrollHeight > el.clientHeight + 1)
          .map((el) => el.textContent?.slice(0, 40)),
        overflow: root.scrollWidth - root.clientWidth,
        headerHeight: document.querySelector(".site-header")!.getBoundingClientRect().height,
        scrollPadding: parseFloat(getComputedStyle(root).scrollPaddingTop),
      };
    });
    expect(result.clipped).toEqual([]);
    expect(result.overflow).toBeLessThanOrEqual(0);
    expect(result.headerHeight).toBeLessThanOrEqual(result.scrollPadding);
  });
}

for (const width of [320, 640, 768, 960, 1280]) {
  test(`reflows at ${width}px with the header fully on screen`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    const result = await page.evaluate(() => {
      const root = document.documentElement;
      const header = document.querySelector(".site-header")!.getBoundingClientRect();
      const controls = [...document.querySelectorAll(".site-header nav a, .site-header .theme-toggle")];
      return {
        overflow: root.scrollWidth - root.clientWidth,
        outside: controls
          .map((el) => ({ name: el.textContent?.trim(), box: el.getBoundingClientRect() }))
          .filter(
            ({ box }) =>
              box.left < 0 ||
              box.right > window.innerWidth ||
              box.top < header.top ||
              box.bottom > header.bottom,
          )
          .map(({ name }) => name),
        count: controls.length,
      };
    });
    expect(result.count).toBeGreaterThan(1);
    expect(result.overflow).toBeLessThanOrEqual(0);
    expect(result.outside).toEqual([]);
  });
}

test("all text meets 7:1 contrast", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2aaa"])
    .withRules(["color-contrast-enhanced"])
    .analyze();
  expect(results.violations).toEqual([]);
});
