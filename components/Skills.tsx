import { skills } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <SectionHeading id="skills-title" command="TYPE">
        Skills
      </SectionHeading>
      <dl className="skills">
        {skills.map(({ name, items }) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
