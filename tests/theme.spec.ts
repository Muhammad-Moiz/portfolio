import { expect, test, type Page } from "@playwright/test";

const DARK_BG = "rgb(18, 16, 11)";
const LIGHT_BG = "rgb(251, 247, 238)";

const bg = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);
const colorScheme = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).colorScheme);

test("dark by default when OS prefers dark", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  expect(await bg(page)).toBe(DARK_BG);
  expect(await colorScheme(page)).toBe("dark");
});

test("light when OS prefers light", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  expect(await bg(page)).toBe(LIGHT_BG);
  expect(await colorScheme(page)).toBe("light");
});

test("toggle works from the keyboard, persists and relabels", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light mode" }).focus();
  await page.keyboard.press("Enter");
  expect(await bg(page)).toBe(LIGHT_BG);
  expect(await colorScheme(page)).toBe("light");
  await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeFocused();
  await page.reload();
  expect(await bg(page)).toBe(LIGHT_BG);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("toggle name follows an OS scheme change after load", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const toggle = page.locator(".theme-toggle");
  await expect(toggle).toHaveAccessibleName("Switch to light mode", { ignoreCase: true });

  await page.emulateMedia({ colorScheme: "light" });
  await expect(toggle).toHaveAccessibleName("Switch to dark mode", { ignoreCase: true });
  const visibleLabel = await toggle.evaluate((button) => {
    const walker = document.createTreeWalker(button, NodeFilter.SHOW_TEXT);
    let text = "";
    while (walker.nextNode()) {
      const parent = walker.currentNode.parentElement!;
      if (parent.checkVisibility() && !parent.closest(".sr-only")) text += walker.currentNode.textContent;
    }
    return text.trim();
  });
  expect(visibleLabel).toBe("☾ Dark");
});

test("stored theme applies before hydration", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("works when storage is blocked", async ({ page }) => {
  const errors: Error[] = [];
  page.on("pageerror", (error) => errors.push(error));
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("blocked");
      },
    });
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  expect(await bg(page)).toBe(LIGHT_BG);
  expect(errors).toEqual([]);
});

test("theme follows OS with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "light" });
  const page = await context.newPage();
  await page.goto("/");
  expect(await bg(page)).toBe(LIGHT_BG);
  await context.close();
});

for (const [scheme, border] of [
  ["dark", "rgb(201, 188, 159)"],
  ["light", "rgb(90, 80, 64)"],
] as const) {
  test(`toggle border meets non-text contrast in ${scheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/");
    const color = await page
      .locator(".theme-toggle")
      .evaluate((el) => getComputedStyle(el).borderTopColor);
    expect(color).toBe(border);
  });
}
