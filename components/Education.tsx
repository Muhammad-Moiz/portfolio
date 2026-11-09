import { education } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <SectionHeading id="education-title" command="TYPE">
        Education & recognition
      </SectionHeading>
      <ul className="rows">
        {education.map(({ when, title, detail }) => (
          <li key={title} className="row">
            <span className="when">{when}</span>
            <p>
              <b>{title}</b> · {detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
