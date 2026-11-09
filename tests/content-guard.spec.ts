import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const forbidden = /al[\s-]?fardan|\bafe?x\b|\b2\.97\b/i;
const binary = /\.(jpe?g|png|webp|gif|ico|pdf|woff2?)$/i;

const trackedFiles = execFileSync("git", ["ls-files"], { encoding: "utf8" }).split("\n").filter(Boolean);

test("no client name or BS CGPA leaks into the site or repo", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).not.toMatch(forbidden);

  expect(trackedFiles.filter((file) => forbidden.test(file))).toEqual([]);

  const leaks = trackedFiles
    .filter((file) => !binary.test(file) && file !== "package-lock.json")
    .filter((file) => forbidden.test(readFileSync(file, "utf8")));
  expect(leaks).toEqual([]);
});

test("published photos carry no EXIF metadata", () => {
  const photos = trackedFiles.filter((file) => /\.jpe?g$/i.test(file));
  expect(photos.length).toBeGreaterThan(0);
  const withExif = photos.filter((file) => readFileSync(file).includes("Exif\0\0"));
  expect(withExif).toEqual([]);
});

test("CV download is a PDF", async ({ request }) => {
  const response = await request.get("/cv.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("page makes no third-party requests", async ({ page, baseURL }) => {
  const origins = new Set<string>();
  page.on("request", (request) => origins.add(new URL(request.url()).origin));

  await page.goto("/");
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForLoadState("networkidle");

  expect([...origins]).toEqual([new URL(baseURL!).origin]);
});
