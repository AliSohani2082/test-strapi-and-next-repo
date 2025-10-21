"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/styles"
import LocaleSwitcher from "@/components/elementary/LocaleSwitcher"
import { StrapiImageWithLink } from "@/components/page-builder/components/utilities/StrapiImageWithLink"
import { StrapiLink } from "@/components/page-builder/components/utilities/StrapiLink"

type Props = {
  links: { href?: string | null; label?: string | null; id: string }[]
  logoImage: any
  locale: string
}

export const MobileNavbar = ({ links, logoImage, locale }: Props) => {
  const [open, setOpen] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackground(window.scrollY > 100)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={cn(
        "text-foreground flex w-full items-center justify-between bg-transparent px-3 py-3 transition-shadow",
        showBackground &&
          "bg-background shadow-[0px_-1px_0px_0px_var(--border),0px_1px_0px_0px_var(--border)]"
      )}
    >
      <StrapiImageWithLink
        component={logoImage}
        linkProps={{ className: "flex items-center space-x-2" }}
        imageProps={{ hideWhenMissing: true }}
      />

      <Menu className="h-6 w-6" onClick={() => setOpen(!open)} />

      {open && (
        <div className="bg-background text-foreground fixed inset-0 z-50 flex flex-col items-start justify-start pt-5 text-xl transition">
          <div className="flex w-full items-center justify-between px-5">
            <StrapiImageWithLink
              component={logoImage}
              linkProps={{ className: "flex items-center space-x-2" }}
              imageProps={{ hideWhenMissing: true }}
            />
            <div className="flex items-center gap-2">
              <LocaleSwitcher locale={locale as any} />
              <X className="h-8 w-8" onClick={() => setOpen(!open)} />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-3 px-6">
            {links.map((navItem: any, idx: number) => (
              <StrapiLink
                key={`${String(navItem.id)}-${idx}`}
                component={
                  {
                    __component: "utilities.link",
                    href: navItem.href ?? undefined,
                    label: navItem.label ?? undefined,
                  } as any
                }
                className="relative"
                onClick={() => setOpen(false)}
              >
                <span className="block text-2xl">{navItem.label}</span>
              </StrapiLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
