import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageTransition, ScrollProgress, WhatsAppFab } from '@/components/layout/PageTransition'
import { useLenis } from '@/hooks/useLenis'

export function MainLayout() {
  useLenis()

  return (
    <div className="relative min-h-screen">
      <div className="noise-overlay fixed inset-0 z-[1] opacity-30 pointer-events-none" />
      <ScrollProgress />
      <Header />
      <main className="relative z-[2]">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
