import { expect, test } from "@playwright/test";

test("page has English lang, title and one h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("Muhammad Moiz: Frontend Engineer (React, TypeScript)");
  await expect(page.locator("h1")).toHaveCount(1);
});
