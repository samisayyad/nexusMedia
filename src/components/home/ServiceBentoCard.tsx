import { useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Printer,
  Palette,
  Package,
  Truck,
  BarChart3,
  TrendingUp,
  FileText,
  Image,
  Check,
  Plus,
  ArrowUpRight,
  FolderOpen,
  Zap,
  Shield,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { serviceUrl } from '@/constants/routes'

interface TabConfig {
  id: string
  label: string
  icon: LucideIcon
  badge?: string
  header: string
  description: string
}

interface ServiceBentoCardProps {
  id?: string
  title: string
  subtitle: string
  tabs: TabConfig[]
  className?: string
  serviceId?: string
  benefits?: string[]
  tags?: string[]
  stats?: { projects: string; turnaround: string }
  defaultTab?: string
}

const defaultTabs = (serviceTitle: string): TabConfig[] => [
  { id: 'overview', label: 'Overview', icon: BarChart3, header: `${serviceTitle} Stats`, description: 'Production metrics and quality scores.' },
  { id: 'design', label: 'Design', icon: Palette, badge: 'New', header: 'Creative Studio', description: 'Design concepts and brand alignment.' },
  { id: 'production', label: 'Production', icon: Printer, header: 'Print Floor', description: 'Live production and quality checks.' },
  { id: 'delivery', label: 'Delivery', icon: Truck, header: 'Dispatch & Install', description: 'Delivery tracking across Belgaum.' },
]

export function ServiceBentoCard({ id = 'bento', title, subtitle, tabs, className, serviceId, benefits = [], tags = [], stats, defaultTab }: ServiceBentoCardProps) {
  const initialTab = defaultTab ? (tabs.find(t => t.id === defaultTab) ?? tabs[0]) : tabs[0]
  const [activeTab, setActiveTab] = useState(initialTab)

  const content = useMemo(() => {
    switch (activeTab.id) {
      case 'overview':
        return <OverviewPanel stats={stats} />
      case 'design':
        return <DesignPanel tags={tags} />
      case 'production':
        return <ProductionPanel serviceTitle={title} />
      case 'delivery':
        return <DeliveryPanel />
      default:
        return <OverviewPanel stats={stats} />
    }
  }, [activeTab.id, stats, tags, title])

  const CardWrapper = serviceId ? Link : 'div'
  const wrapperProps = serviceId ? { to: serviceUrl(serviceId) } : {}

  return (
    <div className={cn('w-full max-w-xl shrink-0', className)}>
      <div className="group relative w-full overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10">
        {/* Header */}
        <div className="relative z-10 space-y-1.5 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xs uppercase tracking-wider text-muted-foreground">{title}</h2>
              <p className="mt-1 max-w-[380px] text-lg font-medium leading-snug text-foreground sm:text-xl">{subtitle}</p>
            </div>
            {serviceId && (
              <CardWrapper {...(wrapperProps as any)} className="ml-3 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all hover:border-accent hover:bg-accent hover:text-white">
                <ArrowUpRight className="size-3.5" />
              </CardWrapper>
            )}
          </div>
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-md border border-border/60 bg-muted px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* App mockup */}
        <div className="relative h-[260px] w-full overflow-hidden sm:h-[300px]">
          <div className="absolute left-16 top-16 h-full w-full rounded-3xl border border-border/50 bg-muted opacity-80" />
          <div className="absolute left-24 top-8 flex h-full w-full flex-col overflow-hidden rounded-tl-3xl bg-background shadow-xl ring-4 ring-border">
            <div className="relative flex items-center rounded-tl-3xl border-b border-border/70 px-5 py-3 backdrop-blur-sm">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-border" />
                <div className="h-2 w-2 rounded-full bg-border" />
                <div className="h-2 w-2 rounded-full bg-border" />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider text-muted-foreground/60">
                Nexus Studio
              </span>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar tabs */}
              <div className="flex w-32 flex-col gap-1 border-r border-border/30 bg-muted/5 p-2 pt-5">
                <LayoutGroup>
                  {tabs.map((tab) => {
                    const isActive = activeTab.id === tab.id
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          'relative flex cursor-pointer items-center gap-1.5 rounded-xl p-2 text-[10px] transition-colors',
                          isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <Icon className="relative z-20 size-3.5 shrink-0" />
                        <span className="relative z-20 truncate font-medium">{tab.label}</span>
                        {tab.badge && (
                          <span className={cn(
                            'relative z-20 ml-auto rounded px-1 py-0.5 text-[7px] tabular-nums',
                            isActive ? 'border border-accent/20 bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                          )}>
                            {tab.badge}
                          </span>
                        )}
                        {isActive && (
                          <>
                            <motion.div layoutId={`pill-${id}`} className="absolute left-0 z-30 h-4 w-0.5 rounded-full bg-accent" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                            <motion.div layoutId={`bg-${id}`} className="absolute inset-0 z-10 rounded-lg border border-border/40 bg-muted" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                          </>
                        )}
                      </button>
                    )
                  })}
                </LayoutGroup>
              </div>

              {/* Content panel */}
              <div className="relative flex flex-1 flex-col gap-3 overflow-hidden p-4 pt-5">
                <header className="flex flex-col gap-0.5">
                  <h3 className="line-clamp-1 text-[10px] font-semibold uppercase tracking-tight text-foreground opacity-60">{activeTab.header}</h3>
                  <p className="line-clamp-1 text-[9px] font-normal leading-tight text-muted-foreground">{activeTab.description}</p>
                </header>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-1"
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-8 bg-gradient-to-t from-background to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits footer */}
        {benefits.length > 0 && (
          <div className="border-t border-border/40 p-4 sm:p-5">
            <div className="grid grid-cols-2 gap-1.5">
              {benefits.slice(0, 4).map((benefit) => (
                <div key={benefit} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Check className="size-3 shrink-0 text-accent" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Content Panels ───────────────────────────────────────────────────────────

function OverviewPanel({ stats }: { stats?: { projects: string; turnaround: string } }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-background to-muted/20 p-3">
        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-medium text-muted-foreground">Print Quality Score</span>
            <ArrowUpRight className="size-3 text-accent" />
          </div>
          <span className="text-xl font-medium tracking-tight text-foreground">98.4%</span>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
            <motion.div initial={{ width: 0 }} animate={{ width: '98.4%' }} className="h-full rounded-full bg-accent" />
          </div>
          <span className="text-[8px] text-muted-foreground">Colour accuracy & finish quality</span>
        </div>
        <BarChart3 className="absolute -bottom-2 -right-2 size-14 rotate-12 opacity-5" />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 p-2.5">
          <div>
            <span className="text-[10px] font-medium text-foreground">{stats?.turnaround ?? '24-48h'}</span>
            <p className="text-[7px] uppercase text-muted-foreground">Turnaround</p>
          </div>
          <Zap className="size-3.5 opacity-20" />
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 p-2.5">
          <div>
            <span className="text-[10px] font-medium text-foreground">{stats?.projects ?? '50+'}</span>
            <p className="text-[7px] uppercase text-muted-foreground">Projects</p>
          </div>
          <TrendingUp className="size-3.5 opacity-20" />
        </div>
      </div>
    </div>
  )
}

function DesignPanel({ tags }: { tags?: string[] }) {
  const displayTags = tags && tags.length > 0 ? tags : ['Brand Layout', 'Print Ready']
  return (
    <div className="grid h-full grid-cols-2 gap-2">
      {[
        { title: displayTags[0] ?? 'Brand Layout', desc: 'Logo & colour system.', icon: Palette },
        { title: displayTags[1] ?? 'Print Ready', desc: 'CMYK optimised files.', icon: FileText },
      ].map((card) => (
        <div key={card.title} className="relative flex flex-col gap-2 overflow-hidden rounded-xl border border-border/40 bg-background/50 p-3">
          <card.icon className="size-4 text-accent/60" />
          <span className="text-[11px] font-medium leading-tight text-foreground">{card.title}</span>
          <span className="text-[8px] leading-tight text-muted-foreground">{card.desc}</span>
          <button type="button" className="mt-auto flex w-fit items-center gap-1 rounded-md bg-primary px-2 py-1 text-[8px] font-semibold text-white">
            <Plus className="size-2.5" /> Create
          </button>
        </div>
      ))}
    </div>
  )
}

function ProductionPanel({ serviceTitle }: { serviceTitle: string }) {
  const jobs = [
    `${serviceTitle} — Order #001`,
    'Quality Check — In Progress',
    'Ready for Dispatch',
  ]
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/40 bg-background/50">
      <div className="flex items-center justify-between border-b border-border/40 bg-muted/30 px-3 py-2">
        <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">Active Jobs</span>
        <Shield className="size-3 text-muted-foreground/40" />
      </div>
      <div className="flex flex-col gap-0.5 p-1">
        {jobs.map((job, i) => (
          <div key={job} className="group flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-muted/30">
            <div className="flex size-5 items-center justify-center rounded-full bg-muted border border-border/40">
              <Printer className="size-2.5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block truncate text-[9px] font-medium text-foreground">{job}</span>
              <span className="text-[7px] text-muted-foreground">{['In Progress', 'QC Check', 'Ready'][i]}</span>
            </div>
            <Check className="size-3 text-accent opacity-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  )
}

function DeliveryPanel() {
  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <div className="flex-1 overflow-hidden rounded-xl border border-border/40 bg-background/50">
        <div className="flex items-center justify-between border-b border-border/40 bg-muted/30 px-3 py-2">
          <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">Dispatch Log</span>
          <Package className="size-3 text-muted-foreground/40" />
        </div>
        <div className="p-1">
          {[
            { file: 'Retail Signage Install', size: 'Belgaum', icon: Image },
            { file: 'Fleet Wrap Delivery', size: 'Hubli', icon: Truck },
            { file: 'Office Branding Kit', size: 'Dharwad', icon: FolderOpen },
          ].map((item) => (
            <div key={item.file} className="group flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-muted/30">
              <div className="flex size-5 items-center justify-center rounded-md border border-border/40 bg-muted/50">
                <item.icon className="size-2.5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-[9px] font-medium text-foreground">{item.file}</span>
                <span className="text-[7px] uppercase text-muted-foreground">{item.size}</span>
              </div>
              <ArrowUpRight className="size-2.5 text-muted-foreground opacity-0 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function createServiceBentoProps(
  serviceId: string,
  serviceTitle: string,
  serviceDesc: string,
  benefits: string[] = [],
  tags: string[] = [],
  stats?: { projects: string; turnaround: string }
) {
  return {
    id: serviceId,
    serviceId,
    title: serviceTitle,
    subtitle: serviceDesc,
    tabs: defaultTabs(serviceTitle),
    benefits,
    tags,
    stats,
  }
}

export function HeroBentoCard() {
  return (
    <ServiceBentoCard
      id="hero-bento"
      title="Print Studio"
      subtitle="Precision printing, bold branding, and signage — all managed from one workspace."
      tabs={defaultTabs('NexusMedia')}
      benefits={['300 DPI quality', 'Any substrate', 'Fast turnaround', 'Colour matched']}
      tags={['Printing', 'Signage', 'Branding', 'Design']}
    />
  )
}
