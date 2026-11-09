import { expect, test } from "@playwright/test";

test("page has English lang, title and one h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("Muhammad Moiz: Frontend Engineer (React, TypeScript)");
  await expect(page.locator("h1")).toHaveCount(1);
});

test("skip link is first, visible on focus, and moves focus to main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.locator(":focus");
  await expect(skip).toHaveText("Skip to content");
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  expect(new URL(page.url()).hash).toBe("#main");
  await expect(page.locator("main")).toBeFocused();
});

test("h1 reads the name without the prompt", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Muhammad Moiz");
});

test("intro actions are links of at least 44px", async ({ page }) => {
  await page.goto("/");
  const actions = [
    { name: "Download CV (PDF)", href: "/cv.pdf" },
    { name: "Email", href: "mailto:muhammadmoiz2221@gmail.com" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-moiz-516a0113a" },
    { name: "GitHub", href: "https://github.com/Muhammad-Moiz" },
  ];
  for (const { name, href } of actions) {
    const link = page.locator(".intro").getByRole("link", { name });
    await expect(link).toHaveAttribute("href", href);
    const box = await link.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
});

test("CV links download the PDF under a readable name", async ({ page }) => {
  await page.goto("/");
  const links = page.getByRole("link", { name: "Download CV (PDF)" });
  await expect(links).toHaveCount(2);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("download", "Muhammad-Moiz-CV.pdf");
  }
});

for (const width of [1280, 390]) {
  test(`logo link returns to the top at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const logo = page.getByRole("link", { name: "MOIZ.DOS" });
    const scrollY = () => page.evaluate(() => window.scrollY);
    const scrollToBottom = async () => {
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      expect(await scrollY()).toBeGreaterThan(1000);
    };

    await scrollToBottom();
    await logo.click();
    await expect.poll(scrollY).toBeLessThanOrEqual(1);

    await scrollToBottom();
    await logo.focus();
    await page.keyboard.press("Enter");
    await expect.poll(scrollY).toBeLessThanOrEqual(1);
  });
}

for (const width of [1280, 320]) {
  test(`nav jumps keep the heading below the sticky header at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const links = page.getByRole("navigation", { name: "Main" }).getByRole("link");
    await expect(links).toHaveText(["Work", "Experience", "Skills", "Contact"]);
    for (const link of await links.all()) {
      const target = page.locator((await link.getAttribute("href")) ?? "");
      if ((await target.count()) === 0) continue;
      await link.click();
      const heading = target.locator("xpath=self::h2 | .//h2").first();
      await expect
        .poll(async () => {
          const top = await heading.evaluate((el) => el.getBoundingClientRect().top);
          const headerBottom = await page
            .locator("header")
            .evaluate((el) => el.getBoundingClientRect().bottom);
          return top >= headerBottom;
        })
        .toBe(true);
    }
  });
}
