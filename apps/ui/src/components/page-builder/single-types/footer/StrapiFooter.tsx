import { Fragment } from "react"
import {
  Clock,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react"
import { getTranslations } from "next-intl/server"

import { AppLocale } from "@/types/general"

import { fetchFooter } from "@/lib/strapi-api/content/server"
import { cn } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"
import StrapiImageWithLink from "@/components/page-builder/components/utilities/StrapiImageWithLink"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"

export default async function StrapiFooter({
  locale,
}: {
  readonly locale: AppLocale
}) {
  const response = await fetchFooter(locale)
  const component = response?.data

  if (component == null) {
    return null
  }

  const t = await getTranslations()

  return (
    <footer className="bg-foreground text-background">
      <Container className="py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info (placed last on large screens to better match RTL visual) */}
          <div className="space-y-6 lg:order-last">
            <div>
              {component.brandTitle && (
                <h3 className="text-gradient-accent mb-2 text-2xl font-bold">
                  {component.brandTitle}
                </h3>
              )}
              {component.brandTagline && (
                <p className="text-muted-foreground/80">
                  {component.brandTagline}
                </p>
              )}
            </div>

            {component.description && (
              <p className="text-background/80 leading-relaxed">
                {component.description}
              </p>
            )}

            <div className="flex gap-4 space-x-reverse">
              {(component.socialMediaLinks ?? [])
                .slice(0, 1)
                .map((link: any) => (
                  <StrapiLink
                    key={`sm-1-${String(link.id)}`}
                    component={link}
                    className="bg-primary hover:bg-primary/80 flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                  >
                    <Instagram className="h-10 w-10 text-white" />
                  </StrapiLink>
                ))}
              {(component.socialMediaLinks ?? [])
                .slice(1, 2)
                .map((link: any) => (
                  <StrapiLink
                    key={`sm-2-${String(link.id)}`}
                    component={link}
                    className="bg-secondary hover:bg-secondary/80 flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                  >
                    <Send className="h-10 w-10 text-white" />
                  </StrapiLink>
                ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-background mb-6 text-lg font-semibold">
              {t("footer.quick_links")}
            </h4>
            <ul className="space-y-3 decoration-0">
              {(component.internalLinks ?? []).map(
                (link: any, index: number) => (
                  <li
                    className="decoration-0"
                    key={`${String(link.id)}-${index}`}
                  >
                    <StrapiLink
                      component={link}
                      className="text-background/80 hover:text-primary transition-colors"
                    />
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-background mb-6 text-lg font-semibold">
              {t("footer.our_services")}
            </h4>
            <ul className="space-y-3">
              {(component.serviceLinks ?? []).map(
                (link: any, index: number) => (
                  <li key={`${String(link.id)}-${index}`}>
                    <StrapiLink
                      component={link}
                      className="text-background/80 hover:text-secondary transition-colors"
                    />
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-background mb-6 text-lg font-semibold">
              {t("footer.contact_info")}
            </h4>
            <ul className="space-y-4">
              {component.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                  <span className="text-background/80">
                    {component.address}
                  </span>
                </li>
              )}

              {component.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="text-secondary h-5 w-5 flex-shrink-0" />
                  <a
                    href={`tel:${component.phone}`}
                    className="text-background/80 hover:text-secondary transition-colors"
                  >
                    {component.phone}
                  </a>
                </li>
              )}

              {component.email && (
                <li className="flex items-center gap-3">
                  <Mail className="text-accent h-5 w-5 flex-shrink-0" />
                  <a
                    href={`mailto:${component.email}`}
                    className="text-background/80 hover:text-accent transition-colors"
                  >
                    {component.email}
                  </a>
                </li>
              )}

              {(component.workingHoursWeekdays ||
                component.workingHoursFriday) && (
                <li className="flex items-start gap-3">
                  <Clock className="text-primary mst-1 h-5 w-5 flex-shrink-0" />
                  <div className="text-background/80">
                    <div>{t("footer.working_hours")}</div>
                    {component.workingHoursWeekdays && (
                      <div>{component.workingHoursWeekdays}</div>
                    )}
                    {component.workingHoursFriday && (
                      <div>{component.workingHoursFriday}</div>
                    )}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Emergency Banner */}
        {component.emergencyPhone ? (
          <div className="bg-destructive/20 border-destructive/30 mt-12 rounded-2xl border p-6">
            <div className="flex items-center justify-center gap-4">
              <Phone className="text-destructive h-6 w-6" />
              <span className="text-destructive text-lg font-semibold">
                {t("footer.emergency_label")}
                <a
                  href={`tel:${component.emergencyPhone}`}
                  className="mr-2 hover:underline"
                >
                  {component.emergencyPhone}
                </a>
              </span>
            </div>
          </div>
        ) : null}

        {/* Bottom Bar */}
        <div className="border-background/20 mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-background/60 text-sm">
              {component.copyRight}
            </div>
            <div className="text-background/60 flex items-center gap-2 space-x-reverse text-sm">
              <span>{t("footer.built_with")}</span>
              <Heart className="text-destructive h-4 w-4" />
              <span>{t("footer.for_your_health")}</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
