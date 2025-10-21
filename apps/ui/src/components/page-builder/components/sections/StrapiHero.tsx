import { Data } from "@repo/strapi"
import { Calendar, Check, MessageCircle, Phone } from "lucide-react"
import { useTranslations } from "next-intl"

import { Container } from "@/components/elementary/Container"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"
import Heading from "@/components/typography/Heading"
import { Button } from "@/components/ui/button"

export function StrapiHero({
  component,
}: {
  readonly component: Data.Component<"sections.hero">
}) {
  const t = useTranslations()

  const hasImage = Boolean(component.image?.media)
  const primaryLink = component.links?.[0]
  const secondaryLink = component.links?.[1]

  // Prefer Strapi-provided steps; otherwise show i18n-based default features
  const features:
    | {
        key: string | number
        icon: React.ComponentType<{ className?: string }>
        text: string
      }[]
    | {
        key: string | number
        icon: React.ComponentType<{ className?: string }>
        text: string
      }[] = component.steps?.length
    ? component.steps.map((step) => ({
        key: step.id ?? step.text,
        icon: Check,
        text: step.text ?? "",
      }))
    : [
        {
          key: "online_booking",
          icon: Calendar,
          text: t("hero.features.online_booking"),
        },
        {
          key: "in_person_booking",
          icon: Phone,
          text: t("hero.features.in_person_booking"),
        },
        {
          key: "emergency_consult",
          icon: MessageCircle,
          text: t("hero.features.emergency_consult"),
        },
      ]

  return (
    <section className="overflow-hidden py-20 lg:py-32">
      <Container>
        <div className="flex flex-col items-center justify-stretch gap-12 lg:flex-row">
          {/* Left: Text */}
          <div
            className={`flex w-full flex-col gap-4 ${hasImage ? "lg:w-1/2" : "lg:w-full"}`}
          >
            <Heading
              tag="h1"
              variant="heading1"
              className="text-primary mb-6 font-semibold"
            >
              {component.title}
            </Heading>
            {component.subTitle && (
              <Heading
                tag="h2"
                variant="heading2"
                className="text-secondary mb-6 font-semibold"
              >
                {component.subTitle}
              </Heading>
            )}

            {/* Features / Steps */}
            <div className="mt-4 mb-10 space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.key ?? index}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-secondary/20 rounded-full p-2">
                      <Icon className="text-secondary h-5 w-5" />
                    </div>
                    <span className="text-lg font-medium">{feature.text}</span>
                  </div>
                )
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {primaryLink ? (
                <Button asChild className="flex gap-2 px-8 py-4 text-lg">
                  <StrapiLink component={primaryLink}>
                    <Calendar className="h-5 w-5" /> {primaryLink.label}
                  </StrapiLink>
                </Button>
              ) : (
                <Button className="flex gap-2 px-8 py-4 text-lg">
                  <Calendar className="h-5 w-5" /> {t("hero.cta_primary")}
                </Button>
              )}

              {secondaryLink ? (
                <Button
                  asChild
                  variant="outline"
                  className="flex gap-2 px-8 py-4 text-lg"
                >
                  <StrapiLink component={secondaryLink}>
                    <MessageCircle className="h-5 w-5" /> {secondaryLink.label}
                  </StrapiLink>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="flex gap-2 px-8 py-4 text-lg"
                >
                  <MessageCircle className="h-5 w-5" />{" "}
                  {t("hero.cta_secondary")}
                </Button>
              )}
            </div>

            {/* Emergency phone */}
            {component.emergencyPhone &&
              component.emergencyPhone.trim() !== "" && (
                <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-red-600" />
                    <span className="flex gap-2 font-semibold text-red-600">
                      {t("hero.emergency_label")}
                      <a
                        href={`tel:${component.emergencyPhone}`}
                        className="hover:underline"
                      >
                        {component.emergencyPhone}
                      </a>
                    </span>
                  </div>
                </div>
              )}
          </div>

          {/* Right: Image */}
          {hasImage && (
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="from-secondary/40 via-secondary/20 absolute inset-0 rotate-3 rounded-3xl bg-gradient-to-br to-transparent opacity-20" />
                <div className="relative rounded-3xl bg-white p-4 shadow-xl sm:p-6 lg:p-8">
                  <StrapiBasicImage
                    component={component.image}
                    className="h-auto w-full rounded-2xl object-contain"
                    forcedSizes={{ height: 500 }}
                    priority
                  />

                  {(component.yearsExperience ||
                    component.patientsSatisfied) && (
                    <>
                      {component.yearsExperience ? (
                        <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-md sm:p-6">
                          <div className="text-center">
                            <div className="text-secondary text-2xl font-bold sm:text-3xl">
                              {component.yearsExperience}+
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {t("hero.years_experience")}
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {component.patientsSatisfied ? (
                        <div className="bg-secondary absolute -top-6 -right-6 rounded-2xl p-3 text-white shadow-md sm:p-4">
                          <div className="text-center">
                            <div className="text-xl font-bold sm:text-2xl">
                              {component.patientsSatisfied}+
                            </div>
                            <div className="text-sm">
                              {t("hero.patients_satisfied")}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

StrapiHero.displayName = "StrapiHero"

export default StrapiHero
