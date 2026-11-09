import { nav } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <a className="logo" href="#top">
          MOIZ.DOS
        </a>
        <nav aria-label="Main">
          <ul>
            {nav.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
