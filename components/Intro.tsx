import { profile } from "@/lib/content";
import { ActionList } from "./ActionList";
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
        <ActionList actions={profile.actions} />
        <ul className="facts">
          {profile.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
