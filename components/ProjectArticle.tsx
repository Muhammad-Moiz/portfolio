import Image from "next/image";
import type { Project } from "@/lib/content";
import { PaymentsIllustration } from "./PaymentsIllustration";

const pairSizes = "(min-width: 900px) 540px, 100vw";
const singleSizes = "(min-width: 1260px) 1100px, 100vw";

export function ProjectArticle({ project }: { project: Project }) {
  const { id, title, meta, intro, bullets, stack, label, figures } = project;
  const titleId = `${id}-title`;
  const paired = figures.length > 1;

  return (
    <article id={id} aria-labelledby={titleId} className="proj">
      <div className="proj-head">
        <h3 id={titleId} className="display">
          {title}
        </h3>
        {label && <span className="tagline">{label}</span>}
      </div>
      <p className="meta">{meta}</p>
      <div className="col">
        <p>{intro}</p>
        {bullets.length > 0 && (
          <ul className="pts">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
        <p className="stack">
          <b>Stack:</b> {stack.join(" · ")}
        </p>
      </div>
      {label === "illustration" && <PaymentsIllustration />}
      {figures.length > 0 && (
        <div className={paired ? "figs" : undefined}>
          {figures.map(({ src, width, height, alt, caption }) => (
            <figure key={src}>
              <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                sizes={paired ? pairSizes : singleSizes}
              />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </article>
  );
}
