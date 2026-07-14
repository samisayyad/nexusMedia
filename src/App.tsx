import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { ROUTES } from '@/constants/routes'
import {
  HomePage,
  AboutPage,
  ServicesPage,
  PortfolioPage,
  GalleryPage,
  IndustriesPage,
  ContactPage,
  QuotePage,
  PrivacyPage,
  TermsPage,
  NotFoundPage,
  ProjectDetailPage,
} from '@/routes/lazyPages'

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="font-display text-2xl font-bold">
          <span className="text-primary">nexus</span><span className="text-accent">Media</span>
        </div>
        <div className="h-0.5 w-32 overflow-hidden rounded-full bg-border">
          <div className="h-full w-full animate-pulse bg-gradient-to-r from-accent to-accent-2" />
        </div>
      </div>
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.about} element={<AboutPage />} />
            <Route path={ROUTES.services} element={<ServicesPage />} />
            <Route path={ROUTES.serviceDetail} element={<ServicesPage />} />
            <Route path={ROUTES.portfolio} element={<PortfolioPage />} />
            <Route path={ROUTES.project} element={<ProjectDetailPage />} />
            <Route path={ROUTES.gallery} element={<GalleryPage />} />
            <Route path={ROUTES.industries} element={<IndustriesPage />} />
            <Route path={ROUTES.contact} element={<ContactPage />} />
            <Route path={ROUTES.quote} element={<QuotePage />} />
            <Route path={ROUTES.privacy} element={<PrivacyPage />} />
            <Route path={ROUTES.terms} element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
