import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Award,
  Calendar,
  CheckCircle,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageProps } from "@/types/next"

import { Link, routing } from "@/lib/navigation"
import { fetchDoctorBySlug } from "@/lib/strapi-api/content/server"
import { formatStrapiMediaUrl } from "@/lib/strapi-helpers"
import { cn } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"
import { Button } from "@/components/ui/button"

export default async function DoctorDetailPage({
  params,
}: PageProps<{ slug: string }>) {
  const { locale, slug } = await params
  if (!routing.locales.includes(locale)) notFound()
  setRequestLocale(locale)

  const response = await fetchDoctorBySlug(slug, locale)
  const doctor = response?.data
  if (!doctor) notFound()
  const t = await getTranslations("doctors.detail")

  return (
    <div className={cn("bg-background min-h-screen")}>
      <Container>
        <div className="px-4 py-12">
          <Link
            href={{ pathname: "/doctor" }}
            className="text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2 transition-colors"
          >
            <span>{t("backToList")}</span>
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="border-border bg-card overflow-hidden rounded-xl border">
                  <div className="from-primary/5 relative h-80 bg-gradient-to-b to-transparent">
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
                            className="h-full w-full object-contain object-bottom"
                          />
                        )
                      }
                      return (
                        <Image
                          src={src}
                          alt={doctor.lastName ?? ""}
                          fill
                          className="object-contain object-bottom"
                        />
                      )
                    })()}
                  </div>
                  <div className="p-6">
                    <h1 className="text-foreground mb-2 text-2xl font-bold">
                      {doctor.firstName
                        ? `${doctor.firstName} ${doctor.lastName ?? ""}`
                        : doctor.lastName}
                    </h1>
                    <p className="text-primary mb-4 font-semibold">
                      {doctor.speciality ?? ""}
                    </p>

                    <div className="mb-6 space-y-3">
                      {doctor.address && (
                        <div className="flex items-start gap-3 text-sm">
                          <MapPin className="text-muted-foreground mt-0.5 h-5 w-5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {doctor.address}
                          </span>
                        </div>
                      )}
                      {doctor.phone && (
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="text-muted-foreground h-5 w-5" />
                          <a
                            href={`tel:${doctor.phone}`}
                            className="text-muted-foreground hover:text-primary"
                          >
                            {doctor.phone}
                          </a>
                        </div>
                      )}
                      {doctor.email && (
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="text-muted-foreground h-5 w-5" />
                          <a
                            href={`mailto:${doctor.email}`}
                            className="text-muted-foreground hover:text-primary"
                          >
                            {doctor.email}
                          </a>
                        </div>
                      )}
                    </div>

                    <Button className="w-full gap-2">
                      <Calendar className="h-4 w-4" />
                      {t("cta")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 lg:col-span-2">
              <div className="border-border bg-card rounded-xl border p-6">
                <h2 className="text-foreground mb-4 text-2xl font-bold">
                  {t("about")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {doctor.about}
                </p>
              </div>

              {Array.isArray(doctor.education) &&
                doctor.education.length > 0 && (
                  <div className="border-border bg-card rounded-xl border p-6">
                    <h2 className="text-foreground mb-4 flex items-center gap-2 text-2xl font-bold">
                      <GraduationCap className="text-primary h-6 w-6" />{" "}
                      {t("education")}
                    </h2>
                    <ul className="space-y-3">
                      {doctor.education.map((e: any, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="text-secondary mt-0.5 h-5 w-5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {e?.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {Array.isArray(doctor.certifications) &&
                doctor.certifications.length > 0 && (
                  <div className="border-border bg-card rounded-xl border p-6">
                    <h2 className="text-foreground mb-4 flex items-center gap-2 text-2xl font-bold">
                      <Award className="text-primary h-6 w-6" />{" "}
                      {t("certifications")}
                    </h2>
                    <ul className="space-y-3">
                      {doctor.certifications.map((e: any, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="text-secondary mt-0.5 h-5 w-5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {e?.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {Array.isArray(doctor.services) && doctor.services.length > 0 && (
                <div className="border-border bg-card rounded-xl border p-6">
                  <h2 className="text-foreground mb-4 text-2xl font-bold">
                    {t("services")}
                  </h2>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {doctor.services.map((e: any, i: number) => (
                      <div
                        key={i}
                        className="bg-primary/5 flex items-center gap-3 rounded-lg p-3"
                      >
                        <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                        <span className="text-foreground">{e?.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
