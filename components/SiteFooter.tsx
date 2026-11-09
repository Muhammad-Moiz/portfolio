import { footer } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        {footer.notes.map((note) => (
          <span key={note}>{note}</span>
        ))}
        <a href={footer.source.href}>{footer.source.label}</a>
      </div>
    </footer>
  );
}
