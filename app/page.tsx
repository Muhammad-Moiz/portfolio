import { Intro } from "@/components/Intro";
import { ProjectArticle } from "@/components/ProjectArticle";
import { ProjectsTable } from "@/components/ProjectsTable";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteHeader } from "@/components/SiteHeader";
import { SmallProjects } from "@/components/SmallProjects";
import { projects, smallProjects } from "@/lib/content";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="wrap">
        <Intro />
        <section id="work" aria-labelledby="work-title">
          <SectionHeading id="work-title" command="DIR">
            Projects
          </SectionHeading>
          <ProjectsTable projects={projects} />
          {projects.map((project) => (
            <ProjectArticle key={project.id} project={project} />
          ))}
          <SmallProjects items={smallProjects} />
        </section>
      </main>
    </>
  );
}
