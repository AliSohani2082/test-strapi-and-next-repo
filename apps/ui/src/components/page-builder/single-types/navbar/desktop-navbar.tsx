"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/styles"
import LocaleSwitcher from "@/components/elementary/LocaleSwitcher"
import { StrapiImageWithLink } from "@/components/page-builder/components/utilities/StrapiImageWithLink"
import { StrapiLink } from "@/components/page-builder/components/utilities/StrapiLink"

import { LoggedUserMenu } from "./LoggedUserMenu"

type Props = {
  links: { href?: string | null; label?: string | null; id: string }[]
  logoImage: any
  company?: string | null
  slogan?: string | null
  locale: string
  user?: { email?: string | null } | null
}

export const DesktopNavbar = ({
  links,
  logoImage,
  company,
  slogan,
  locale,
  user,
}: Props) => {
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowBackground(window.scrollY > 100)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={cn(
        "bg-background text-foreground flex flex-row items-center justify-between px-6 py-4 transition-shadow",
        showBackground &&
          "shadow-[0px_-1px_0px_0px_var(--border),0px_1px_0px_0px_var(--border)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        {/* Logo with optional company and slogan next to it, using the repo wrappers */}
        <StrapiImageWithLink
          component={logoImage}
          linkProps={{ className: "flex items-center space-x-2" }}
          imageProps={{
            forcedSizes: { width: 90, height: 60 },
            hideWhenMissing: true,
          }}
        />
        {(company || slogan) && (
          <div className="flex flex-col leading-tight">
            {company && (
              <span className="text-foreground text-sm font-semibold">
                {company}
              </span>
            )}
            {slogan && (
              <span className="text-muted-foreground text-xs">{slogan}</span>
            )}
          </div>
        )}
        <div className="ml-4 flex items-center gap-1.5">
          {links.map((link) => (
            <StrapiLink
              key={String(link.id)}
              component={
                {
                  __component: "utilities.link",
                  href: link.href ?? undefined,
                  label: link.label ?? undefined,
                } as any
              }
              className="text-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center rounded-md px-3 py-2 text-sm transition"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        {user ? <LoggedUserMenu user={user as any} /> : null}
        <LocaleSwitcher locale={locale as any} />
      </div>
    </nav>
  )
}
