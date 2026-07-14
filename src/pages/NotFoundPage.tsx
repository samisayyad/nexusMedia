import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-display text-[clamp(6rem,20vw,12rem)] font-bold leading-none text-primary/10">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-primary md:text-4xl">
          Looks like you&apos;re <span className="text-accent">off the grid</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-secondary">
          The page you&apos;re looking for doesn&apos;t exist. Maybe it was moved, renamed, or it never existed in the first place.
        </p>
        <Button asChild variant="accent" size="lg" className="mt-8">
          <Link to={ROUTES.home}>← Back to Home</Link>
        </Button>
      </motion.div>
    </div>
  )
}
