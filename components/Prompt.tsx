export function Prompt({ children }: { children?: string }) {
  return (
    <span aria-hidden="true" className="prompt">
      C:\&gt; {children}
    </span>
  );
}
