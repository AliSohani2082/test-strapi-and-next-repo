import { Data } from "@repo/strapi"

import { AppLocale } from "@/types/general"

import { getAuth } from "@/lib/auth"
import { fetchNavbar } from "@/lib/strapi-api/content/server"
import { cn } from "@/lib/styles"

import { DesktopNavbar } from "./desktop-navbar"
import { MobileNavbar } from "./mobile-navbar"

const hardcodedLinks: NonNullable<
  Data.ContentType<"api::navbar.navbar">["links"]
> = [{ id: "client-page", href: "/client-page", label: "Client Page" }]

export default async function StrapiNavbar({
  locale,
}: {
  readonly locale: AppLocale
}) {
  const response = await fetchNavbar(locale)
  const navbar = response?.data

  if (navbar == null) {
    return null
  }

  const links = (navbar.links ?? [])
    .filter((link) => link.href)
    .concat(...hardcodedLinks)
  const uiLinks: { id: string; href?: string | null; label?: string | null }[] =
    links.map((l) => ({
      id: String(l.id),
      href: l.href ?? null,
      label: l.label ?? null,
    }))

  const session = await getAuth()

  return (
    <nav
      className={cn(
        "border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky inset-x-0 top-0 z-40 mx-auto w-full max-w-7xl border-b backdrop-blur"
      )}
    >
      <div className="hidden w-full lg:block">
        <DesktopNavbar
          locale={locale}
          links={uiLinks}
          logoImage={navbar.logoImage}
          company={(navbar as any).company}
          slogan={(navbar as any).slogan}
          user={session?.user}
        />
      </div>
      <div className="flex h-full w-full items-center lg:hidden">
        <MobileNavbar
          locale={locale}
          links={uiLinks}
          logoImage={navbar.logoImage}
        />
      </div>
    </nav>
  )
}
