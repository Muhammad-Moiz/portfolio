import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>© 2026 Muhammad Moiz</span>
        <span>Built with Next.js · tested against WCAG 2.2 AA</span>
        <a href={site.repo}>Source on GitHub</a>
      </div>
    </footer>
  );
}
