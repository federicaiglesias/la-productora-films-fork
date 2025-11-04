'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // Reset theme on route change
  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  // Sync provider → state
  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme)
    }
  }, [headerTheme, theme])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open)
  }

  // Saber si el link /aidemos está activo
  const isActive = pathname === '/aidemos'

  return (
    <>
      {/* HEADER */}
      <header
        data-theme={theme ?? undefined}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none font-avenir"
      >
        <div className="px-4 lg:px-8 py-4 flex items-center justify-between pointer-events-auto relative">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-10">
            <Logo loading="eager" priority="high" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
            <HeaderNav data={data} />

            {/* AI DEMOS link */}
            {pathname === '/aidemos' && (
              <Link
                href="/aidemos"
                className={`font-avenir uppercase tracking-wider text-sm hover:text-white/80 transition-colors whitespace-nowrap inline-flex items-center ${
                  isActive ? 'text-white underline underline-offset-4' : ''
                }`}
              >
                AI DEMOS
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="lg:hidden flex-shrink-0 p-2 text-white hover:text-white/80 transition-colors z-50"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden lg:block flex-shrink-0 w-[100px]" />
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm h-screen transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="container py-8 pt-20 space-y-6">
          <HeaderNav data={data} isMobile />
          {pathname === '/aidemos' && (
            <Link
              href="/aidemos"
              className={`block text-center uppercase tracking-wide text-lg transition-opacity ${
                isActive
                  ? 'text-white underline underline-offset-4'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              AI DEMOS
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
