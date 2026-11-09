import { profile } from "@/lib/content";
import { Prompt } from "./Prompt";

export function Intro() {
  return (
    <section className="intro">
      <p className="boot" aria-hidden="true">
        Starting MOIZ.DOS v6.0 ... ready.
      </p>
      <h1 className="display">
        <Prompt />
        {profile.name}
      </h1>
      <div className="col">
        <p className="role">{profile.role}</p>
        <p>{profile.summary}</p>
        <ul className="actions">
          {profile.actions.map(({ label, href, accessibleName }, i) => (
            <li key={href}>
              <a
                className={i === 0 ? "action action-primary" : "action"}
                href={href}
                aria-label={accessibleName}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="facts">
          {profile.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
