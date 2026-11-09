import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This project lives inside the home directory, which has its own lockfile.
  // Pin the tracing root so Next.js does not walk up and pick the wrong one.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
