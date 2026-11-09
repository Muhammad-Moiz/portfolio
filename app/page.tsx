import { Intro } from "@/components/Intro";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="wrap">
        <Intro />
      </main>
    </>
  );
}
