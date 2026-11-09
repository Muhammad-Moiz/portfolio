import { expect, test } from "@playwright/test";

test("security headers", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["strict-transport-security"]).toBe("max-age=63072000; includeSubDomains; preload");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toBe("camera=(), microphone=(), geolocation=()");
  expect(headers["x-frame-options"]).toBe("DENY");
});
