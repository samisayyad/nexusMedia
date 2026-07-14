import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { PROJECTS } from '@/constants/data'
import { ROUTES } from '@/constants/routes'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = PROJECTS.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="container-nx flex min-h-screen flex-col items-center justify-center pt-20 text-center">
        <h1 className="text-display-lg font-display font-bold text-primary">Project Not Found</h1>
        <Button asChild className="mt-6">
          <Link to={ROUTES.portfolio}>Back to Portfolio</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <section className="relative min-h-[60vh] pt-[72px]">
        <div className="container-nx py-12">
          <Link to={ROUTES.portfolio} className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>
        </div>
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-nx pb-12">
            <SectionLabel>{project.category}</SectionLabel>
            <h1 className="mt-4 text-display-xl font-display font-bold text-primary">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-secondary">{project.desc}</p>
          </div>
        </div>
      </section>

      <section className="section-nx">
        <div className="container-nx grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-primary">The Challenge</h2>
              <p className="mt-4 text-secondary leading-relaxed">
                {project.client} needed a comprehensive {project.category.toLowerCase()} solution that would elevate their brand presence in Belgaum and deliver measurable business results.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-primary">Printing Process</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.process.map((step, i) => (
                  <div key={step} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-primary">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-primary">Before & After</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl">
                  <p className="mb-2 text-xs uppercase tracking-wider text-secondary">Before</p>
                  <img src={project.beforeImage} alt="Before" loading="lazy" className="aspect-video w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <p className="mb-2 text-xs uppercase tracking-wider text-secondary">After</p>
                  <img src={project.afterImage} alt="After" loading="lazy" className="aspect-video w-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm uppercase tracking-wider text-secondary">Client</h3>
              <p className="mt-2 font-display font-bold text-primary">{project.client}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm uppercase tracking-wider text-secondary">Technologies</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
              <h3 className="text-sm uppercase tracking-wider text-accent">Result</h3>
              <p className="mt-2 font-display text-lg font-bold text-primary">{project.result}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm uppercase tracking-wider text-secondary">Client Review</h3>
              <p className="mt-3 text-secondary italic">&ldquo;{project.review}&rdquo;</p>
            </div>
            <Button asChild variant="accent" size="lg" className="w-full">
              <Link to={ROUTES.quote}>Start Similar Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
