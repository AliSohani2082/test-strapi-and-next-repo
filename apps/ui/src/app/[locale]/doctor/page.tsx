import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageProps } from "@/types/next"

import { Link, routing } from "@/lib/navigation"
import { fetchDoctors } from "@/lib/strapi-api/content/server"
import { formatStrapiMediaUrl } from "@/lib/strapi-helpers"
import { cn } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"

export default async function DoctorsPage({ params }: PageProps) {
  const { locale } = await params
  if (!routing.locales.includes(locale)) notFound()
  setRequestLocale(locale)

  const response = await fetchDoctors(locale)
  const doctors = response?.data ?? []
  const t = await getTranslations("doctors.list")

  return (
    <div className={cn("bg-background min-h-screen")}>
      <section className="from-primary/10 to-secondary/10 relative bg-gradient-to-l py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={{ pathname: "/doctor/" + (doctor.slug ?? doctor.id) }}
                className="group border-border bg-card hover:shadow-medium overflow-hidden rounded-xl border shadow-sm transition-all duration-300"
              >
                <div className="from-primary/5 relative h-64 overflow-hidden bg-gradient-to-b to-transparent">
                  {(() => {
                    const media = doctor?.image
                    const format =
                      media?.formats?.medium ??
                      media?.formats?.small ??
                      media?.formats?.thumbnail
                    const url = format?.url ?? media?.url
                    const src = formatStrapiMediaUrl(url)
                    const width = format?.width ?? media?.width
                    const height = format?.height ?? media?.height
                    if (!src) return null
                    if (width && height) {
                      return (
                        <Image
                          src={src}
                          alt={doctor.lastName ?? ""}
                          width={width}
                          height={height}
                          className="h-full w-full object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
                        />
                      )
                    }
                    return (
                      <Image
                        src={src}
                        alt={doctor.lastName ?? ""}
                        fill
                        className="object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
                      />
                    )
                  })()}
                </div>
                <div className="p-6">
                  <h3 className="text-foreground group-hover:text-primary mb-2 text-xl font-bold transition-colors">
                    {doctor.firstName
                      ? `${doctor.firstName} ${doctor.lastName ?? ""}`
                      : doctor.lastName}
                  </h3>
                  <p className="text-primary mb-2 font-semibold">
                    {doctor.speciality || ""}
                  </p>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {doctor.about?.slice(0, 120) || ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
