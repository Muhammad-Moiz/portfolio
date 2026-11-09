import { Prompt } from "./Prompt";

type Props = { id: string; command?: string; children: string };

export function SectionHeading({ id, command, children }: Props) {
  return (
    <h2 id={id}>
      <Prompt>{command}</Prompt>{" "}
      {children}
    </h2>
  );
}
