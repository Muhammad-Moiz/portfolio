import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const forbidden = /al[\s-]?fardan|\bafe?x\b|\b2\.97\b/i;
const binary = /\.(jpe?g|png|webp|gif|ico|pdf|woff2?)$/i;

function trackedTextFiles() {
  return execFileSync("git", ["ls-files"], { encoding: "utf8" })
    .split("\n")
    .filter((file) => file && !binary.test(file) && file !== "package-lock.json");
}

test("no client name or BS CGPA leaks into the site or repo", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).not.toMatch(forbidden);

  const leaks = trackedTextFiles().filter((file) => forbidden.test(readFileSync(file, "utf8")));
  expect(leaks).toEqual([]);
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
