import type { SmallProject } from "@/lib/content";

export function SmallProjects({ items }: { items: SmallProject[] }) {
  return (
    <div className="two">
      {items.map(({ id, title, meta, body, stack }) => (
        <article key={id} id={id} aria-labelledby={`${id}-title`} className="box">
          <h3 id={`${id}-title`}>{title}</h3>
          <p className="meta">{meta}</p>
          <p>{body}</p>
          <p className="stack">
            <b>Stack:</b> {stack.join(" · ")}
          </p>
        </article>
      ))}
    </div>
  );
}
