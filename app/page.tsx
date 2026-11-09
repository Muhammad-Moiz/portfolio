import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Intro } from "@/components/Intro";
import { ProjectArticle } from "@/components/ProjectArticle";
import { ProjectsTable } from "@/components/ProjectsTable";
import { Prompt } from "@/components/Prompt";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Skills } from "@/components/Skills";
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
        <section id="work" className="section" aria-labelledby="work-title">
          <SectionHeading id="work-title" command="DIR">
            Projects
          </SectionHeading>
          <ProjectsTable projects={projects} />
          {projects.map((project) => (
            <ProjectArticle key={project.id} project={project} />
          ))}
          <SmallProjects items={smallProjects} />
        </section>
        <Experience />
        <Skills />
        <Education />
        <Contact />
        <p className="closing">
          <Prompt />
          <span className="cursor" aria-hidden="true" />
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
