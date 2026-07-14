import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PROJECTS } from '@/constants/data'

const CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))]

export default function PortfolioPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <>
      <section className="relative min-h-[50vh] pt-[72px]">
        <div className="container-nx py-20 md:py-28">
          <SectionLabel>Our Work</SectionLabel>
          <h1 className="mt-6 max-w-4xl text-display-xl font-display font-bold text-primary">
            Portfolio of <span className="text-accent">Excellence</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-secondary">
            Browse through our curated collection of print, branding, signage, and advertising projects delivered to clients across Belgaum and Karnataka.
          </p>
        </div>
      </section>

      <section className="section-nx pt-0">
        <div className="container-nx">
          <div className="mb-12 flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  active === cat
                    ? 'bg-primary text-white'
                    : 'border border-border bg-card text-secondary hover:border-accent hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/portfolio/${project.id}`}
                  className="group relative block overflow-hidden rounded-[2rem] border border-border bg-card"
                >
                  <div className={`grid lg:grid-cols-2 ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
                    <div className={`relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px] ${i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    <div className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}`}>
                      <span className="text-xs uppercase tracking-widest text-accent">{project.category}</span>
                      <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl group-hover:text-accent transition-colors">
                        {project.title}
                      </h2>
                      <p className="mt-4 text-secondary">{project.desc}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies.map((t) => (
                          <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs text-secondary">{t}</span>
                        ))}
                      </div>
                      <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                        View Case Study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
