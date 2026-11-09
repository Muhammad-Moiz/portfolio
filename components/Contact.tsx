import { profile } from "@/lib/content";
import { ActionList } from "./ActionList";
import { SectionHeading } from "./SectionHeading";

const [cv, email, ...rest] = profile.actions;
const actions = [{ ...email, label: "Email me" }, cv, ...rest];

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <SectionHeading id="contact-title">Contact</SectionHeading>
      <p>
        {profile.location} {profile.relocation}
      </p>
      <ActionList actions={actions} />
    </section>
  );
}
