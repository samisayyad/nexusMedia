import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface UseRevealOptions {
  threshold?: number
  triggerOnce?: boolean
  delay?: number
}

export function useReveal({ threshold = 0.1, triggerOnce = true, delay = 0 }: UseRevealOptions = {}) {
  const { ref, inView } = useInView({ threshold, triggerOnce })
  const style = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
  }
  return { ref, inView, style }
}

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
    }

    const onLeave = () => {
      el.style.transform = 'translate(0, 0)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}

export function useMouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--spotlight-x', `${x}px`)
      el.style.setProperty('--spotlight-y', `${y}px`)
    }

    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return ref
}
