import { contact } from "@/lib/content";
import { ActionList } from "./ActionList";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <SectionHeading id="contact-title">Contact</SectionHeading>
      <p>
        {contact.location} {contact.relocation}
      </p>
      <ActionList actions={contact.actions} />
    </section>
  );
}
