import type { Link } from "@/lib/content";

export function ActionList({ actions }: { actions: Link[] }) {
  return (
    <ul className="actions">
      {actions.map(({ label, href, accessibleName, download }, i) => (
        <li key={href}>
          <a
            className={i === 0 ? "action action-primary" : "action"}
            href={href}
            aria-label={accessibleName}
            download={download}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
