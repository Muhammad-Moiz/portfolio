import { expect, test } from "@playwright/test";
import { site } from "../lib/content";

test("meta description, canonical and Open Graph", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", site.description);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${site.url}/`);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", site.title);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
});

test("Person JSON-LD", async ({ page }) => {
  await page.goto("/");
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(raw ?? "");
  expect(data["@type"]).toBe("Person");
  expect(data.sameAs).toHaveLength(2);
});

test("sitemap, robots, icon and OG image respond", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain(site.url);

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");

  expect((await request.get("/icon.svg")).status()).toBe(200);

  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toBe("image/png");
});
