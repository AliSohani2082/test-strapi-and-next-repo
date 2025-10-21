import { Data } from "@repo/strapi"
import {
  BookOpen,
  Brain,
  Dumbbell,
  Globe,
  GraduationCap,
  Heart,
  Shield,
  Stethoscope,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Container } from "@/components/elementary/Container"
import Heading from "@/components/typography/Heading"
import Paragraph from "@/components/typography/Paragraph"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StrapiServices({
  component,
}: {
  readonly component: Data.Component<"sections.services">
}) {
  const t = useTranslations()
  // Array of color and borderColor pairs to cycle through for services
  const serviceColors = [
    { color: "text-pink-500 bg-pink-50", borderColor: "border-pink-200" },
    { color: "text-orange-500 bg-orange-50", borderColor: "border-orange-200" },
    { color: "text-purple-500 bg-purple-50", borderColor: "border-purple-200" },
    { color: "text-red-500 bg-red-50", borderColor: "border-red-200" },
    { color: "text-blue-500 bg-blue-50", borderColor: "border-blue-200" },
    { color: "text-green-500 bg-green-50", borderColor: "border-green-200" },
    { color: "text-teal-500 bg-teal-50", borderColor: "border-teal-200" },
    { color: "text-indigo-500 bg-indigo-50", borderColor: "border-indigo-200" },
  ]

  return (
    <section id="services" className="bg-muted/30 py-20">
      <Container className="px-4">
        {/* Section Header */}
        <div className="fade-in mb-16 text-center">
          <Heading tag="h2" variant="heading2" className="mb-6">
            {t("services.title")}
          </Heading>
          <Paragraph
            variant="base"
            className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed"
          >
            {component.description}
          </Paragraph>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {(component.services ?? []).map((service: any, index: number) => (
            <Card
              key={index}
              className={`rounded-xl border ${service.borderColor} hover:scale-105`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Paragraph
                  variant="base"
                  className="text-muted-foreground text-center leading-relaxed"
                >
                  {service.description}
                </Paragraph>
              </CardContent>
              <div className="mt-6 text-center">
                <Button
                  variant="link"
                  className="text-primary hover:text-primary-dark font-semibold transition-colors"
                >
                  {t("services.more_info")} ←
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="fade-in mt-16 text-center">
          <Paragraph
            variant="base"
            className="text-muted-foreground mb-6 text-lg"
          >
            {t("services.cta.question")}
          </Paragraph>
          <Button variant="default">
            {t("services.cta.free_consultation")}
          </Button>
        </div>
      </Container>
    </section>
  )
}

StrapiServices.displayName = "StrapiServices"

export default StrapiServices
