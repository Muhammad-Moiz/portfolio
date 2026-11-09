import { experience } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" command="TYPE">
        Experience
      </SectionHeading>
      <ul className="rows">
        {experience.map(({ company, location, period, roles, summary }) => (
          <li key={company} className="row">
            <span className="when">{period}</span>
            <div>
              <p className="row-title">
                <b>{company}</b> · {location}
              </p>
              {roles.map((role) => (
                <p key={role}>{role}</p>
              ))}
              <p className="muted">{summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
