import type { Project } from "@/lib/content";

type Props = { projects: Project[] };

const smallProjectRow = {
  id: "property-ways",
  code: "PROPWAYS",
  role: "Backend",
  about: "Property platform REST API",
};

export function ProjectsTable({ projects }: Props) {
  const rows = [...projects, smallProjectRow];

  return (
    <>
      <div className="table-scroll" role="region" aria-label="Projects table" tabIndex={0}>
        <table>
          <caption className="sr-only">Projects, with role and a short description</caption>
          <thead>
            <tr>
              <th scope="col">NAME</th>
              <th scope="col">ROLE</th>
              <th scope="col">ABOUT</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <a href={`#${row.id}`}>{row.code}</a>
                </td>
                <td>{row.role}</td>
                <td>{row.about}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-sum">{rows.length} projects · plus earlier client work</p>
    </>
  );
}
