'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { urlFor } from '../../../sanity/lib/image'

interface NavLink {
  _key: string
  label: { en: string; de: string }
  href?: string
  pageSlug?: string
}

interface Service {
  _id: string
  title: { en: string; de: string }
  slug?: { current: string }
}

interface NavigationData {
  logo?: any
  logoLight?: any
  navLinks: NavLink[]
  servicesLabel?: { en: string; de: string }
  loginLabel: { en: string; de: string }
  loginHref: string
}

interface NavigationProps {
  data: NavigationData
  services?: Service[]
  locale: 'en' | 'de'
}

const locales: Array<'en' | 'de'> = ['en', 'de']

export default function Navigation({ data, services, locale }: NavigationProps) {
  const pathname = usePathname()
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setServicesOpen(false)
      setMobileOpen(false)
      setMobileServicesOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const pathWithoutLocale = pathname.replace(/^\/(en|de)/, '') || '/'
  const isExternal = (href: string) => /^https?:\/\//i.test(href)
  const resolveHref = (href: string) => (isExternal(href) ? href : `/${locale}${href}`)
  const linkHref = (link: NavLink) => link.pageSlug ? `/${link.pageSlug}` : (link.href || '/')
  const activeServices = (services || []).filter((service) => service.slug?.current)
  const loginHref = resolveHref(data.loginHref || '/login')
  const loginIsExternal = isExternal(data.loginHref || '')

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-white/20 transition-colors duration-300 ${
        scrolled ? 'bg-primary-dark/70 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1680px] mx-auto flex items-stretch">
        <Link href={`/${locale}`} className="shrink-0 flex items-center px-6 md:px-12 lg:px-20 py-4">
          {data.logoLight?.asset || data.logo?.asset ? (
            <span className="relative block h-12 w-48 md:h-16 md:w-64">
              <Image
                src={urlFor(data.logoLight?.asset ? data.logoLight : data.logo).width(300).url()}
                alt={(data.logoLight?.asset ? data.logoLight.alt : data.logo?.alt) || 'Presentiq'}
                fill
                priority
                className="object-contain object-left"
              />
            </span>
          ) : (
            <span className="font-display text-xl md:text-2xl font-bold text-white">
              Presentiq
            </span>
          )}
        </Link>

        <div className="hidden lg:flex items-stretch divide-x divide-white/20 ml-auto">
          {activeServices.length > 0 && (
            <div
              className="relative flex items-center px-3"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls="desktop-services-menu"
                className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium uppercase text-white hover:text-primary-blue transition-colors"
              >
                {t(data.servicesLabel) || 'Services'}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                id="desktop-services-menu"
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-300 ease-out ${
                  servicesOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="w-64 rounded-2xl border border-neutral-light bg-white shadow-xl py-3">
                  {activeServices.map((service) => (
                    <Link
                      key={service._id}
                      href={`/${locale}/services/${service.slug!.current}`}
                      tabIndex={servicesOpen ? 0 : -1}
                      className="block px-5 py-2.5 text-sm uppercase text-primary-dark hover:bg-gray-50 hover:text-primary-blue transition-colors"
                    >
                      {t(service.title)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          {data.navLinks?.map((link) => (
            <div key={link._key} className="flex items-center px-8">
              <Link
                href={resolveHref(linkHref(link))}
                {...(isExternal(linkHref(link)) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="whitespace-nowrap text-sm font-medium uppercase text-white hover:text-primary-blue transition-colors"
              >
                {t(link.label)}
              </Link>
            </div>
          ))}

          <div className="flex items-center gap-1 px-8 whitespace-nowrap text-sm font-semibold">
            {locales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-1">
                {i > 0 && <span className="text-white/40" aria-hidden="true">/</span>}
                <Link
                  href={`/${loc}${pathWithoutLocale}`}
                  className={
                    loc === locale
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }
                >
                  {loc.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>

          <div className="flex items-center pl-8 pr-6 md:pr-12 lg:pr-20">
            <Link
              href={loginHref}
              {...(loginIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="whitespace-nowrap font-semibold rounded-full transition-all duration-200 border-1 border-white text-white active:bg-white active:text-white active:scale-105 px-4 py-2 text-sm"
            >
              {t(data.loginLabel) || 'Login'}
            </Link>
          </div>
        </div>

        <div className="lg:hidden ml-auto flex items-center px-6">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            className="relative w-8 h-8 shrink-0"
          >
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full transition-transform duration-300 ${
                mobileOpen ? 'rotate-45 bg-primary-dark' : '-translate-y-2 bg-white'
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 w-6 rounded-full transition-opacity duration-200 ${
                mobileOpen ? 'opacity-0 bg-primary-dark' : 'opacity-100 bg-white'
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full transition-transform duration-300 ${
                mobileOpen ? '-rotate-45 bg-primary-dark' : 'translate-y-2 bg-white'
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav-panel"
        className={`lg:hidden overflow-y-auto bg-white border-t transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[80vh] border-neutral-light opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6">
          {activeServices.length > 0 && (
            <li className="border-b border-neutral-light">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((open) => !open)}
                aria-expanded={mobileServicesOpen}
                aria-haspopup="true"
                aria-controls="mobile-services-menu"
                tabIndex={mobileOpen ? 0 : -1}
                className="w-full flex items-center justify-between py-4 text-sm font-medium uppercase text-primary-dark"
              >
                {t(data.servicesLabel) || 'Services'}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id="mobile-services-menu"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex flex-col pb-3">
                  {activeServices.map((service) => (
                    <Link
                      key={service._id}
                      href={`/${locale}/services/${service.slug!.current}`}
                      tabIndex={mobileOpen && mobileServicesOpen ? 0 : -1}
                      className="py-2 pl-4 text-sm uppercase text-primary-dark/80"
                    >
                      {t(service.title)}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          )}
          {data.navLinks?.map((link) => (
            <li key={link._key} className="border-b border-neutral-light">
              <Link
                href={resolveHref(linkHref(link))}
                tabIndex={mobileOpen ? 0 : -1}
                {...(isExternal(linkHref(link)) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block py-4 text-sm font-medium uppercase text-primary-dark"
              >
                {t(link.label)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between px-6 pb-6 pt-4">
          <div className="flex items-center gap-1 text-sm font-semibold">
            {locales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-1">
                {i > 0 && <span className="text-gray-300" aria-hidden="true">/</span>}
                <Link
                  href={`/${loc}${pathWithoutLocale}`}
                  tabIndex={mobileOpen ? 0 : -1}
                  className={
                    loc === locale
                      ? 'text-primary-dark'
                      : 'text-gray-500 hover:text-primary-dark'
                  }
                >
                  {loc.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>

          <Link
            href={loginHref}
            tabIndex={mobileOpen ? 0 : -1}
            {...(loginIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="font-semibold rounded-full transition-all duration-200 border-2 border-primary-blue text-primary-blue active:bg-primary-blue active:text-white active:scale-105 px-4 py-2 text-sm"
          >
            {t(data.loginLabel) || 'Login'}
          </Link>
        </div>
      </div>
    </header>
  )
}
