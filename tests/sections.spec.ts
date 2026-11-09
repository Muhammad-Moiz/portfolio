import { expect, test } from "@playwright/test";

test("heading outline", async ({ page }) => {
  await page.goto("/");
  const h2 = page.getByRole("heading", { level: 2 });
  await expect(h2).toHaveCount(5);
  const names = ["Projects", "Experience", "Skills", "Education & recognition", "Contact"];
  for (const [i, name] of names.entries()) {
    await expect(h2.nth(i)).toHaveAccessibleName(name);
  }
  expect(await page.getByRole("heading", { level: 3 }).count()).toBeGreaterThanOrEqual(5);
  for (const heading of await page.getByRole("heading").all()) {
    await expect(heading).toHaveAccessibleName(/^(?!C:\\)/);
  }
});

test("experience dates match the CV", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#experience");
  for (const date of [
    "Aug 2022 – Present",
    "Jul 2025 – Present",
    "Aug 2022 – Jul 2025",
    "Mar 2021 – Jul 2022",
    "Sep 2020 – Mar 2021",
  ]) {
    await expect(section).toContainText(date);
  }
});

test("skills are the CV's four groups", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#skills dt")).toHaveText([
    "FRONTEND",
    "TESTING",
    "DESIGN & DELIVERY",
    "BACKEND & TOOLS",
  ]);
});

test("contact offers email, CV, LinkedIn and GitHub", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact).toContainText("Based in Karachi, Pakistan.");
  await expect(contact).toContainText("Open to relocating to the UK, UAE, Portugal or Spain.");
  const expected = [
    ["Email me", "mailto:muhammadmoiz2221@gmail.com"],
    ["Download CV (PDF)", "/cv.pdf"],
    ["LinkedIn", "https://www.linkedin.com/in/muhammad-moiz-516a0113a"],
    ["GitHub", "https://github.com/Muhammad-Moiz"],
  ];
  for (const [name, href] of expected) {
    await expect(contact.getByRole("link", { name })).toHaveAttribute("href", href);
  }
});

test("footer links to the source", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer).toContainText("© 2026 Muhammad Moiz");
  await expect(footer).toContainText("Built with Next.js · tested against WCAG 2.2 AA");
  await expect(footer.getByRole("link", { name: "Source on GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/Muhammad-Moiz/portfolio",
  );
});

test("decorative cursor and prompts are hidden from assistive tech", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".cursor")).toHaveCount(1);
  for (const el of await page.locator(".prompt, .cursor").all()) {
    await expect(el).toHaveAttribute("aria-hidden", "true");
  }
});

test("section prompt is spaced from the title and stays out of the name", async ({ page }) => {
  await page.goto("/");
  const heading = page.locator("#work-title");
  const visible = await heading.evaluate((el) => (el as HTMLElement).innerText.replace(/\s+/g, " ").trim());
  expect(visible).toBe(String.raw`C:\> DIR Projects`);
  await expect(heading).toHaveAccessibleName("Projects");
});
