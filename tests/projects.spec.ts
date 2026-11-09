import { expect, test } from "@playwright/test";

test("projects table has caption, column headers and 6 rows", async ({ page }) => {
  await page.goto("/");
  const table = page.getByRole("table");
  await expect(table).toHaveCount(1);
  await expect(table).toHaveAccessibleName("Projects, with role and a short description");
  await expect(table.getByRole("columnheader")).toHaveText(["NAME", "ROLE", "ABOUT"]);
  const rows = table.getByRole("row").filter({ has: page.getByRole("cell") });
  await expect(rows).toHaveCount(6);
  await expect(rows.getByRole("cell").and(page.locator("td:first-child"))).toHaveText([
    "AWARDED",
    "ATLAS",
    "UAE-PAY",
    "FOXTONS",
    "VERTOSA",
    "PROPWAYS",
  ]);
});

test("every table name links to an existing section", async ({ page }) => {
  await page.goto("/");
  const links = page.getByRole("table").getByRole("link");
  await expect(links).toHaveCount(6);
  for (const link of await links.all()) {
    const href = await link.getAttribute("href");
    expect(href).toMatch(/^#.+/);
    await expect(page.locator(href ?? "")).toHaveCount(1);
  }
});

test("every image has meaningful alt text", async ({ page }) => {
  await page.goto("/");
  const images = page.locator("img");
  await expect(images).toHaveCount(5);
  for (const img of await images.all()) {
    expect(((await img.getAttribute("alt")) ?? "").length).toBeGreaterThan(20);
  }
});

test("images reserve space", async ({ page }) => {
  await page.goto("/");
  for (const img of await page.locator("img").all()) {
    await expect(img).toHaveAttribute("width", /^\d+$/);
    await expect(img).toHaveAttribute("height", /^\d+$/);
  }
});

test("illustration is one labelled image", async ({ page }) => {
  await page.goto("/");
  const illustration = page.getByRole("img", { name: /salary run summary/ });
  await expect(illustration).toHaveCount(1);
  await expect(illustration).toHaveAttribute("aria-label", /Sample data/);
  await expect(page.getByText("An illustration with made-up data. The real system is confidential.")).toBeVisible();
});

test("project headings read as their titles", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 2, name: "Projects" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3 })).toHaveText([
    "Awarded AI",
    "Atlas HXM",
    "UAE Payments Platform",
    "Foxtons",
    "Vertosa",
    "Property Ways",
    "Earlier client work",
  ]);
});

test("no horizontal scroll at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
