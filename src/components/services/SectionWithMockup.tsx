import React from 'react'
import { motion } from 'framer-motion'

interface SectionWithMockupProps {
  title: string | React.ReactNode
  description: string | React.ReactNode
  primaryImageSrc: string
  secondaryImageSrc: string
  reverseLayout?: boolean
}

export function SectionWithMockup({
  title,
  description,
  primaryImageSrc,
  secondaryImageSrc,
  reverseLayout = false,
}: SectionWithMockupProps) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  }

  const layoutClasses = reverseLayout ? 'md:grid-cols-2 md:grid-flow-col-dense' : 'md:grid-cols-2'
  const textOrderClass = reverseLayout ? 'md:col-start-2' : ''
  const imageOrderClass = reverseLayout ? 'md:col-start-1' : ''

  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-32">
      <div className="container-nx relative z-10">
        <motion.div
          className={`grid w-full grid-cols-1 items-center gap-16 md:gap-8 ${layoutClasses}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className={`mx-auto mt-10 flex max-w-[546px] flex-col items-start gap-4 md:mx-0 md:mt-0 ${textOrderClass}`}
            variants={itemVariants}
          >
            <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-[40px] md:leading-[53px]">
              {title}
            </h2>
            <p className="text-sm leading-6 text-white/60 md:text-[15px]">{description}</p>
          </motion.div>

          <motion.div
            className={`relative mx-auto mt-10 w-full max-w-[300px] md:mt-0 md:max-w-[471px] ${imageOrderClass}`}
            variants={itemVariants}
          >
            <motion.div
              className="absolute z-0 h-[317px] w-[300px] rounded-[32px] bg-[#090909] md:h-[500px] md:w-[472px]"
              style={{
                top: reverseLayout ? 'auto' : '10%',
                bottom: reverseLayout ? '10%' : 'auto',
                left: reverseLayout ? 'auto' : '-20%',
                right: reverseLayout ? '-20%' : 'auto',
                filter: 'blur(2px)',
              }}
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? -20 : -30 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div
                className="relative h-full w-full rounded-[32px] bg-cover bg-center"
                style={{ backgroundImage: `url(${secondaryImageSrc})` }}
              />
            </motion.div>

            <motion.div
              className="relative z-10 h-[405px] w-full overflow-hidden rounded-[32px] border-0 bg-white/5 backdrop-blur-[15px] md:h-[637px]"
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? 20 : 30 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${primaryImageSrc})` }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 z-0 h-px w-full"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)',
        }}
      />
    </section>
  )
}
